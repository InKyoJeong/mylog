import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      // useErrorBoundary: true,
      staleTime: 300000,
      retry: false,
    },
    mutations: {
      // useErrorBoundary: true,
      retry: false,
    },
  },
});

export default queryClient;
