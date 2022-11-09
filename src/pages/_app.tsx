import type { NextComponentType } from "next" // Import Component type
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

import AuthGuard from "@/components/Common/AuthGuard"
import Layout from "@/components/Layout"
import Meta from "@/components/Meta"

import "../styles/fonts/stylesheet.css"
import "../styles/hamburger.css"
import "../styles/globals.scss"

type CustomAppProps = AppProps & {
  Component: NextComponentType & { requireAuth?: boolean } // add auth type
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <>
      <Meta />
      <SessionProvider session={pageProps.session}>
        {Component.requireAuth ? (
          <AuthGuard>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthGuard>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </>
  )
}

export default MyApp
