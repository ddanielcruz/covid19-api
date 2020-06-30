import dayjs from 'dayjs';
import { Types } from 'mongoose';
import Extraction, { IExtraction } from '@models/Extraction';

export default class ExtractionService {
  async findByPlace(place: string | Types.ObjectId): Promise<IExtraction[]> {
    return await Extraction.find({ place });
  }

  async findByDate(date: Date): Promise<IExtraction[]> {
    const parsedDate = dayjs(date);
    const extractions = await Extraction.find({
      createdAt: {
        $gte: parsedDate.startOf('day').toDate(),
        $lte: parsedDate.endOf('day').toDate(),
      },
    });

    return extractions;
  }
}
