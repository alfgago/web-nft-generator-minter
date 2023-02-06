import { SessionProvider } from "next-auth/react"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"

import AuthGuard from "@/components/Common/AuthGuard"
import Layout from "@/components/Layout"
import Meta from "@/components/Meta"
import { goerli, polygon } from "@wagmi/core/chains"

import "../styles/fonts/stylesheet.css"
import "../styles/hamburger.css"
import "../styles/globals.scss"

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, polygon],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <>
      <Meta />
      <WagmiConfig client={client}>
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
      </WagmiConfig>
    </>
  )
}

export default MyApp
