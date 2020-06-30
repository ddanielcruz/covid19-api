import { Types } from 'mongoose';

import Place, { IPlace } from '@models/Place';
import Extraction, { IExtraction } from '@models/Extraction';

type PlaceWithLastExtraction = IPlace & {
  lastExtraction?: IExtraction;
};

export default class PlaceService {
  async findAll(): Promise<IPlace[]> {
    return await Place.find();
  }

  async findOne(id: string | Types.ObjectId): Promise<PlaceWithLastExtraction> {
    const place = await Place.findById(id);

    if (!place) {
      return null;
    }

    const lastExtraction = await Extraction.find({ place: id })
      .sort({ createdAt: -1 })
      .limit(1);

    return {
      ...place.toJSON(),
      lastExtraction: lastExtraction.length ? lastExtraction[0] : null,
    };
  }
}
