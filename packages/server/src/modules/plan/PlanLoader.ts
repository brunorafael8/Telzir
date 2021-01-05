import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';

import PlanModel from './PlanModel';

export default class Plan {
  _id: string;
  id: string;
  name: string;
  minutes: string;

  constructor(data) {
    this.id = data.id || data._id;
    this._id = data._id;
    this.name = data.name;
    this.minutes = data.minutes;
  }
}

export const getLoader = () => new DataLoader((ids) => mongooseLoader(PlanModel, ids));

const viewerCanSee = () => true;

export const load = async (context, id) => {
  if (!id) return null;

  try {
    const data = await context.dataloaders.PlanLoader.load(id);

    if (!data) {
      return null;
    }

    return viewerCanSee() ? new Plan(data) : null;
  } catch (err) {
    return null;
  }
};

export const loadPlans = async (context, args) => {
  const plans = PlanModel.find({}, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: plans,
    context,
    args,
    loader: load,
  });
};
