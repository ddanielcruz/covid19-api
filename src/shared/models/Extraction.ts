import mongoose, { Schema, Document, Types } from 'mongoose';
import { IPlace } from '@models/Place';

export type IExtraction = Document & {
  totalCases: number;
  totalDeaths: number;
  totalRecovered: number;
  totalTests: number;
  activeCases: number;
  criticalCases: number;
  place: Types.ObjectId | IPlace;
  createdAt: Date;
  updatedAt: Date;
};

const ExtractionSchema = new Schema(
  {
    totalCases: {
      type: Number,
      required: true,
      min: 0,
    },
    totalDeaths: {
      type: Number,
      required: true,
      min: 0,
    },
    totalRecovered: {
      type: Number,
      required: true,
      min: 0,
    },
    totalTests: {
      type: Number,
      required: true,
      min: 0,
    },
    activeCases: {
      type: Number,
      required: true,
      min: 0,
    },
    criticalCases: {
      type: Number,
      required: true,
      min: 0,
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExtraction>('Extraction', ExtractionSchema);
