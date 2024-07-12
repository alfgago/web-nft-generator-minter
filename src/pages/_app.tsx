import { SessionProvider } from "next-auth/react"

import AuthGuard from "@/components/Common/AuthGuard"
import Layout from "@/components/Layout"
import Meta from "@/components/Meta"
import { ThirdwebProvider } from "thirdweb/react";

import "../styles/fonts/stylesheet.css"
import "../styles/hamburger.css"
import "../styles/globals.scss"

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <>
      <Meta />
      <ThirdwebProvider>
        <SessionProvider session={session}>
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
      </ThirdwebProvider>
    </>
  )
}

export default MyApp
