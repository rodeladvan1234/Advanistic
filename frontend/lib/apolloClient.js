import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://store-4i2bbs0q.saleor.cloud/graphql/' }),
  cache: new InMemoryCache(),
});

export default client;
