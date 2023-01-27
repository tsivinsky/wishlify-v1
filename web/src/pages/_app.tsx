import React, { useEffect, useState } from "react";

import type { AppProps } from "next/app";

import "@/styles/app.css";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useTokens } from "@/stores/useTokens";

import { Page } from "@/types/page";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000,
    },
  },
};

type AppPageProps = {
  accessToken?: string;
  refreshToken?: string;
};

type WishlifyAppProps = AppProps & {
  Component: Page;
  pageProps: AppPageProps & {
    dehydratedState?: DehydratedState;
  };
};

const App = ({ Component, pageProps }: WishlifyAppProps) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  const getLayout = Component.getLayout || ((page) => page);
  const Layout = Component.layout || React.Fragment;

  const { setTokens } = useTokens();

  const { accessToken, refreshToken } = pageProps;

  useEffect(() => {
    if (!accessToken || !refreshToken) return;

    setTokens({ accessToken, refreshToken });
  }, [accessToken, refreshToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
