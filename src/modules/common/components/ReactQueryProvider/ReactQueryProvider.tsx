import { type PropsWithChildren, type FC } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import useConstant from "../../hooks/useConstant";

export const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useConstant(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
