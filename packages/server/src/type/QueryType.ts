import { GraphQLObjectType } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import { NodeField } from '../interface/NodeInterface';
import { PlanLoader, PriceLoader } from '../loader';
import { PlanConnection } from '../modules/plan/PlanType';
import { PriceConnection } from '../modules/price/PriceType';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    plans: {
      type: PlanConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: (obj, args, context) => PlanLoader.loadPlans(context, args),
    },
    price: {
      type: PriceConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: (obj, args, context) => PriceLoader.loadPrices(context, args),
    },
  }),
});
