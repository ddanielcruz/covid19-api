import dayjs from 'dayjs';

import Extraction, { IExtraction } from '@models/Extraction';
import { IPlace } from '@models/Place';

export default class PlaceService {
  async fetchCasesByDate(date: Date): Promise<IExtraction[]> {
    const parsedDate = dayjs(date);
    const extractions = await Extraction.find({
      createdAt: {
        $gte: parsedDate.startOf('day').toDate(),
        $lte: parsedDate.endOf('day').toDate(),
      },
    }).populate('place');

    const mappedCases = extractions.reverse().reduce((map, extraction) => {
      const place = extraction.place as IPlace;
      map[place.name] = map[place.name] || extraction;

      return map;
    }, {});

    return Object.values(mappedCases);
  }
}
