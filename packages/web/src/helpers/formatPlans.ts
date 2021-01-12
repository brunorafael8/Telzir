import { AppQueryResponse } from '../__generated__/AppQuery.graphql';

export const formatPlans = (plans: AppQueryResponse['plans']) =>
  plans?.edges.map((i) => {
    return { key: i?.node.id, value: i?.node.name, label: i?.node.name };
  });
