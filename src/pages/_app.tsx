import { SessionProvider } from "next-auth/react"
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react"

import AuthGuard from "@/components/Common/AuthGuard"
import Layout from "@/components/Layout"
import Meta from "@/components/Meta"

import "../styles/fonts/stylesheet.css"
import "../styles/hamburger.css"
import "../styles/globals.scss"

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const desiredChainId = ChainId.Mainnet; // or any other chain ID you want to use

  return (
    <>
      <Meta />
      <ThirdwebProvider desiredChainId={desiredChainId}>
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
