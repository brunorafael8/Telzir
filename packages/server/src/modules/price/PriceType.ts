import { GraphQLObjectType, GraphQLString, GraphQLObjectTypeConfig, GraphQLNonNull, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../../interface/NodeInterface';
import { connectionDefinitions } from '../../connection/CustomConnectionType';

import { GraphQLContext } from '../../TypeDefinition';

import Price from './PriceLoader';

type ConfigType = GraphQLObjectTypeConfig<Price, GraphQLContext>;

const PriceTypeConfig: ConfigType = {
  name: 'Price',
  description: 'Represents Price',
  fields: () => ({
    id: globalIdField('Price'),
    _id: {
      type: GraphQLString,
      description: 'MongoDB _id',
      resolve: (price) => price._id.toString(),
    },
    origin: {
      type: GraphQLString,
      resolve: (price) => price.origin,
    },
    destiny: {
      type: GraphQLString,
      resolve: (price) => price.destiny,
    },
    pricePerMinute: {
      type: GraphQLString,
      resolve: (price) => price.pricePerMinute,
    },
  }),
  interfaces: () => [NodeInterface],
};

const PriceType = new GraphQLObjectType(PriceTypeConfig);

export const PriceConnection = connectionDefinitions({
  name: 'Price',
  nodeType: GraphQLNonNull(PriceType),
});

export default PriceType;
