import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { mmkv } from '../services/storage/mmkv';

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

const persister = createSyncStoragePersister({
  storage: {
    getItem: (key: string) => {
      const value = mmkv.getString(key);
      return value === undefined ? null : value;
    },
    setItem: (key: string, value: string) => {
      mmkv.set(key, value);
    },
    removeItem: (key: string) => {
      mmkv.delete(key);
    },
  },
 
});

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
