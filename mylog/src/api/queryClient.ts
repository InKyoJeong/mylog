import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      // useErrorBoundary: true,
      // refetchOnWindowFocus: false,
      staleTime: 60000,
      retry: false,
    },
  },
});

export default queryClient;
