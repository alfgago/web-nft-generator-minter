import type { AppProps } from "next/app"

import Layout from "@/components/Layout"
import Meta from "@/components/Meta"

import "../styles/fonts/stylesheet.css"
import "../styles/hamburger.css"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
