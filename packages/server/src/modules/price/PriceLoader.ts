import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';

import PriceModel from './PriceModel';

export default class Price {
  _id: string;
  id: string;
  origin: string;
  destiny: string;
  pricePerMinute: string;

  constructor(data) {
    this.id = data.id || data._id;
    this._id = data._id;
    this.origin = data.origin;
    this.destiny = data.destiny;
    this.pricePerMinute = data.pricePerMinute;
  }
}

export const getLoader = () => new DataLoader((ids) => mongooseLoader(PriceModel, ids));

const viewerCanSee = () => true;

export const load = async (context, id) => {
  if (!id) return null;

  try {
    const data = await context.dataloaders.PriceLoader.load(id);

    if (!data) {
      return null;
    }

    return viewerCanSee() ? new Price(data) : null;
  } catch (err) {
    return null;
  }
};

export const loadPrices = async (context, args) => {
  const prices = PriceModel.find({}, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: prices,
    context,
    args,
    loader: load,
  });
};
