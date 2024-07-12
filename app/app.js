import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'next-auth/providers';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Head>
        <title>WORKGUILDHUB</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;