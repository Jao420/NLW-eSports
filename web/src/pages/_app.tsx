import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link href="/assets/background-galaxy.png/assets/background-galaxy.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
