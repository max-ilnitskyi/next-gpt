// AppQueryClient.test.ts
import { AppQueryClient } from './AppQueryClient';
import * as ReactQueryModule from '@tanstack/react-query';

const QueryClient = ReactQueryModule.QueryClient;

jest.mock('@tanstack/react-query', () => ({
  __esModule: true,
  isServer: false,
  QueryClient: jest.fn(),
  defaultShouldDehydrateQuery: jest.fn(),
}));

describe('AppQueryClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AppQueryClient._browserQueryClient = null;
  });

  it('should create a new QueryClient if running on the server', () => {
    jest.replaceProperty(ReactQueryModule, 'isServer', true);

    const queryClient = AppQueryClient.get();
    expect(queryClient).toBeInstanceOf(QueryClient);

    expect(QueryClient).toHaveBeenCalledTimes(1);
  });

  it('should create and cache a QueryClient in the browser', () => {
    jest.replaceProperty(ReactQueryModule, 'isServer', false);

    const client1 = AppQueryClient.get();
    const client2 = AppQueryClient.get();

    expect(QueryClient).toHaveBeenCalledTimes(1);
    expect(client1).toBe(client2);
  });

  it('should create a new QueryClient when browser client is null', () => {
    jest.replaceProperty(ReactQueryModule, 'isServer', false);

    const client = AppQueryClient.get();

    expect(QueryClient).toHaveBeenCalledTimes(1);
    expect(client).toBeInstanceOf(QueryClient);
  });

  it('should create a new QueryClient with correct default options', () => {
    jest.replaceProperty(ReactQueryModule, 'isServer', true);

    AppQueryClient.get();

    expect(QueryClient).toHaveBeenCalledWith({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
        dehydrate: {
          shouldDehydrateQuery: expect.any(Function),
        },
      },
    });
  });
});
