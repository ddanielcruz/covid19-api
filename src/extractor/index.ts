import 'dotenv/config';
import mongoose from 'mongoose';
import cheerio from 'cheerio';
import axios from 'axios';

import { createMongoUrl } from '@config/mongo';
import { ExtractionAttr } from '@models/Extraction';

class Extractor {
  private url: string = 'https://www.worldometers.info/coronavirus';

  constructor() {
    this.setup();
  }

  private setup() {
    mongoose.connect(createMongoUrl(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  run = async () => {
    const $ = await this.fetch();

    // Find rows containing countries, territories and conveyances
    const rows = $('#main_table_countries_today tbody')
      .first()
      .find('tr')
      .not('.total_row_world');

    // Parse extracted rows and summarize world total cases
    const cases = this.parseCases($, rows);
    const world = this.summarizeCases(cases);

    // Finally, store extracted values
    this.store([world, ...cases]);
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
          place: cells[1],
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

  private store = (cases: ExtractionAttr[]) => {
    //
  };
}

export default new Extractor();
