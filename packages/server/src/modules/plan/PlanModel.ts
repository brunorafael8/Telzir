import mongoose, { Document, Model } from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    minutes: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export interface IPlan extends Document {
  name: string;
  minutes: string;
}

const PlanModel: Model<IPlan> = mongoose.models.Plan || mongoose.model('Plan', Schema);

export default PlanModel;
