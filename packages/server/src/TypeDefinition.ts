import DataLoader from 'dataloader';
import { Types } from 'mongoose';
import { Context } from 'koa';

export type DataLoaderKey = Types.ObjectId | string | undefined | null;

export interface GraphQLDataloaders {
  EventLoader: DataLoader<DataLoaderKey>;
}

export interface GraphQLContext {
  dataloaders: GraphQLDataloaders;
  appplatform: string;
  koaContext: Context;
}
