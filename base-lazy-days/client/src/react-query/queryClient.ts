import { createStandaloneToast } from '@chakra-ui/react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientConfig,
} from 'react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  // toast.closeAll();
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

const config: QueryClientConfig = {
  queryCache: new QueryCache({
    onError: queryErrorHandler,
  }),
  mutationCache: new MutationCache({
    onError: queryErrorHandler,
  }),
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10min
      cacheTime: 900000, // 15min,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
};

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient(config);
