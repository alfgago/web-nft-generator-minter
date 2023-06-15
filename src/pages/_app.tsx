import { SessionProvider } from "next-auth/react"

import AuthGuard from "@/components/Common/AuthGuard"
import Layout from "@/components/Layout"
import Meta from "@/components/Meta"
import { PaperSDKProvider } from "@/components/PaperSDKProvider"

import "../styles/fonts/stylesheet.css"
import "../styles/hamburger.css"
import "../styles/globals.scss"

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <>
      <Meta />
      <PaperSDKProvider
        appName="PlusOne"
        clientId={process.env.NEXT_PUBLIC_PAPER_TOKEN}
        // @ts-ignore
        chainName={process.env.NEXT_PUBLIC_PAPER_NETWORK}
      >
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
      </PaperSDKProvider>
    </>
  )
}

export default MyApp
