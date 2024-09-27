import {
  isServer,
  QueryClient,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';

export class AppQueryClient {
  static _browserQueryClient: null | QueryClient = null;

  static _makeQueryClient(): QueryClient {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
        dehydrate: {
          // include pending queries in dehydration
          shouldDehydrateQuery: (query) =>
            defaultShouldDehydrateQuery(query) ||
            query.state.status === 'pending',
        },
      },
    });
  }

  static get(): QueryClient {
    if (isServer) {
      // Server: always make a new query client
      return this._makeQueryClient();
    } else {
      // Browser: make a new query client if we don't already have one
      // This is very important, so we don't re-make a new client if React
      // suspends during the initial render. This may not be needed if we
      // have a suspense boundary BELOW the creation of the query client
      if (!this._browserQueryClient) {
        this._browserQueryClient = this._makeQueryClient();
      }
      return this._browserQueryClient as QueryClient;
    }
  }
}
