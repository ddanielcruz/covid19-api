import mongoose, { Schema, Document } from 'mongoose';

export type IPlace = Document & {
  name: string;
};

const PlaceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export default mongoose.model<IPlace>('Place', PlaceSchema);
