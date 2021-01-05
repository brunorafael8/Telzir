import { GraphQLObjectType, GraphQLString, GraphQLObjectTypeConfig, GraphQLNonNull, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../../interface/NodeInterface';
import { connectionDefinitions } from '../../connection/CustomConnectionType';

import { GraphQLContext } from '../../TypeDefinition';

import Plan from './PlanLoader';

type ConfigType = GraphQLObjectTypeConfig<Plan, GraphQLContext>;

const PlanTypeConfig: ConfigType = {
  name: 'Plan',
  description: 'Represents Plan',
  fields: () => ({
    id: globalIdField('Plan'),
    _id: {
      type: GraphQLString,
      description: 'MongoDB _id',
      resolve: (plan) => plan._id.toString(),
    },
    name: {
      type: GraphQLString,
      resolve: (plan) => plan.name,
    },
    minutes: {
      type: GraphQLInt,
      resolve: (plan) => plan.minutes,
    },
  }),
  interfaces: () => [NodeInterface],
};

const PlanType = new GraphQLObjectType(PlanTypeConfig);

export const PlanConnection = connectionDefinitions({
  name: 'Plan',
  nodeType: GraphQLNonNull(PlanType),
});

export default PlanType;
