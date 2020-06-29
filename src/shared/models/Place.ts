import mongoose, { Schema, Document } from 'mongoose';

export type IPlace = Document & {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const PlaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPlace>('Place', PlaceSchema);
