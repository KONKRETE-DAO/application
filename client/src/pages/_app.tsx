import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from '@web3-react/core'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../common/utils/ThemeConfig';
import { Amplify, API } from 'aws-amplify';
import awsExports from '../aws-exports';
import Layout from '../components/Layout';

Amplify.configure(awsExports);

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3ReactProvider>
    </ThemeProvider>
  )
}

export default MyApp
