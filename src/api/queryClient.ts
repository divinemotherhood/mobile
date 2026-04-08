import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const persister = {
  persistClient: async (client: any) => {
    await AsyncStorage.setItem('REACT_QUERY_OFFLINE_CACHE', JSON.stringify(client));
  },
  restoreClient: async () => {
    const cache = await AsyncStorage.getItem('REACT_QUERY_OFFLINE_CACHE');
    return cache ? JSON.parse(cache) : undefined;
  },
  removeClient: async () => {
    await AsyncStorage.removeItem('REACT_QUERY_OFFLINE_CACHE');
  },
};

export const setupQueryPersistence = async () => {
  try {
    await persistQueryClient({
      queryClient,
      persister,
      maxAge: 24 * 60 * 60 * 1000,
      buster: 'v1',
      dehydrateOptions: {
        shouldDehydrateQuery: () => true,
      },
    });
  } catch (error) {
    if (__DEV__) {
      console.warn('[Query Persistence]', error);
    }
  }
};
