import cheerio from 'cheerio';
import axios from 'axios';
import mapKeys from 'lodash/mapKeys';
import dayjs from 'dayjs';
import chalk from 'chalk';

import Extraction, { ExtractionAttr } from '@models/Extraction';
import Place, { IPlace } from '@models/Place';

class Extractor {
  private url: string = 'https://www.worldometers.info/coronavirus';

  run = async () => {
    this.log('Starting extraction');
    const $ = await this.fetch();

    // Find rows containing countries, territories and conveyances
    const rows = $('#main_table_countries_today tbody')
      .first()
      .find('tr')
      .not('.total_row_world');
    this.log('Successfully extracted rows from Worldometers');

    // Parse extracted rows and summarize world total cases
    const cases = this.parseCases($, rows);
    const world = this.summarizeCases(cases);
    cases.unshift(world);
    this.log('Parsed extracted cases');

    // Store extracted places
    const extractedPlaces = cases.map(({ place }) => ({ name: place }));
    const places = await this.storePlaces(extractedPlaces as IPlace[]);

    // Finally, store extracted cases
    await this.storeCases(cases, places);
    this.log('Successfully stored places and extractions');
  };

  private fetch = async (): Promise<CheerioStatic> => {
    const { data } = await axios.get(this.url);
    return cheerio.load(data);
  };

  private parseCases($: CheerioStatic, rows: Cheerio): ExtractionAttr[] {
    const parseNumber = (value: string) => parseInt(value.replace(/,/g, ''));

    return rows
      .map((idx, row) => {
        const cells = $(row)
          .find('td')
          .map((idx, cell) => $(cell).text())
          .get();

        return {
          place: cells[1].trim(),
          totalCases: parseNumber(cells[2]) || 0,
          totalDeaths: parseNumber(cells[4]) || 0,
          totalRecovered: parseNumber(cells[6]) || 0,
          activeCases: parseNumber(cells[8]) || 0,
          criticalCases: parseNumber(cells[9]) || 0,
          totalTests: parseNumber(cells[12]) || 0,
        };
      })
      .get();
  }

  private summarizeCases(cases: ExtractionAttr[]): ExtractionAttr {
    return cases.reduce(
      (acc, curr) => {
        acc.totalCases += curr.totalCases;
        acc.totalDeaths += curr.totalDeaths;
        acc.totalRecovered += curr.totalRecovered;
        acc.totalTests += curr.totalTests;
        acc.activeCases += curr.activeCases;
        acc.criticalCases += curr.criticalCases;
        return acc;
      },
      {
        place: 'World',
        totalCases: 0,
        totalDeaths: 0,
        totalRecovered: 0,
        totalTests: 0,
        activeCases: 0,
        criticalCases: 0,
      }
    );
  }

  private storePlaces = async (places: IPlace[]): Promise<IPlace[]> => {
    // Find existing places and store new ones
    const existingPlaces = await Place.find();
    let newPlaces = places.filter(({ name }) => {
      return !existingPlaces.some((place) => place.name === name);
    });

    if (newPlaces.length) {
      console.log(newPlaces);
      newPlaces = await Place.create(newPlaces);
    }

    return [...existingPlaces, ...newPlaces];
  };

  private storeCases = async (cases: ExtractionAttr[], places: IPlace[]) => {
    const mappedPlaces = mapKeys(places, 'name');

    cases.forEach((_case) => {
      const place = mappedPlaces[_case.place as string];
      _case.place = place._id;
    });

    await Extraction.create(cases);
  };

  private log(message: string) {
    let timestamp = dayjs().format('DD/MM/YYYY HH:mm:ss.SSS');
    timestamp = chalk.green(`[${timestamp}]`);

    console.log(timestamp, message);
  }
}

export default new Extractor();
