import { Types } from 'mongoose';
import Place, { IPlace } from '@models/Place';

export default class PlaceService {
  async findAll(): Promise<IPlace[]> {
    return await Place.find();
  }

  async findOne(id: string | Types.ObjectId): Promise<IPlace> {
    // TODO: Fetch last extraction
    return await Place.findById(id);
  }
}
