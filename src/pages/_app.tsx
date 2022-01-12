import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../context/SidebarContext";
import { makeServer } from "../services/mirage";
import { queryClient } from "../services/queryClient";
import { AuthProvider } from "../context/AuthContext";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
