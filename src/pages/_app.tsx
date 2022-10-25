import type { AppProps } from "next/app"

import Layout from "@/components/Layout"
import Meta from "@/components/Meta"
import { SessionProvider } from "next-auth/react"
import "../styles/fonts/stylesheet.css"
import "../styles/hamburger.css"
import "../styles/globals.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Meta />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}

export default MyApp
