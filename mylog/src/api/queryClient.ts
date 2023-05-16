import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      // useErrorBoundary: true,
      // refetchOnWindowFocus: false,
      staleTime: 300000,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
