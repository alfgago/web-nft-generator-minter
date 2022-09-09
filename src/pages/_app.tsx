import type { AppProps } from "next/app"
import Meta from "@/components/Meta"
import Layout from "@/components/Layout"

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
