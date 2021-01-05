import mongoose, { Document, Model } from 'mongoose';

const Schema = new mongoose.Schema(
  {
    origin: {
      type: String,
      required: true,
    },
    destiny: {
      type: String,
      required: true,
    },
    pricePerMinute: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export interface IPrice extends Document {
  origin: string;
  destiny: string;
  pricePerMinute: string;
}

const PriceModel: Model<IPrice> = mongoose.models.Price || mongoose.model('Price', Schema);

export default PriceModel;
