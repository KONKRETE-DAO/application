import Head from "next/head";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../common/utils/ThemeConfig";
import { Amplify, API } from "aws-amplify";
import awsExports from "../aws-exports";
import Layout from "../components/Layout";
import "../../styles/globals.css";

Amplify.configure(awsExports);

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Konkrete</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps}></Component>
          </Layout>
        </Web3ReactProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
