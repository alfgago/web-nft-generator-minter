/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { alchemyProvider } from "wagmi/providers/alchemy"

import type { SupportedChainName } from "@paperxyz/js-client-sdk"
import { createClient as createClientCore } from "@wagmi/core"
import { goerli, polygon } from "@wagmi/core/chains"

interface SDKContext {
  chainName: SupportedChainName
  setChainName: Dispatch<SetStateAction<SupportedChainName>>
  clientId: string
  appName: string
  user: any
}
const PaperSDKContext = createContext<SDKContext>({
  chainName: "Polygon",
  setChainName: () => {},
  clientId: "",
  appName: "",
  user: null,
})

export interface PaperProviderProps {
  chainName?: SupportedChainName
  appName?: string
  clientId?: string
}

/**
 * @typedef PaperProviderProps
 * @type {object}
 * @property {string} appName - The name used to display
 * @property {string}  chainName - deprecated. Not used anymore
 * @property {string} clientId - deprecated. Used by VerifyOwnershipWithPaper which has since been deprecated
 * @param {PaperProviderProps} props
 */
export const PaperSDKProvider = ({
  appName = "",
  chainName = "Goerli",
  clientId = "",
  children,
}: React.PropsWithChildren<PaperProviderProps>) => {
  const [chainName_, setChainName] = useState<SupportedChainName>(chainName)
  const contextValue = useMemo(
    () => ({
      chainName: chainName_,
      setChainName,
      appName: appName,
      clientId: clientId,
      user: null,
    }),
    [chainName_, appName, clientId]
  )

  const { chains, provider, webSocketProvider } = configureChains(
    [goerli, polygon],
    [
      alchemyProvider({
        apiKey:
          process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ||
          "0Uqb4GwdMaeTOoCV8zghzzCb9ilb577B",
      }),
    ]
  )

  const client = useMemo(
    () =>
      createClient({
        autoConnect: true,
        connectors: [
          new MetaMaskConnector({
            chains,
            options: {
              shimChainChangedDisconnect: true,
              shimDisconnect: true,
              UNSTABLE_shimOnConnectSelectAccount: true,
            },
          }),
          new WalletConnectConnector({
            chains,
            options: {
              qrcode: true,
            },
          }),
          new CoinbaseWalletConnector({
            chains,
            options: {
              appName: appName || "Paper.xyz",
            },
          }),
        ],
        provider,
        webSocketProvider,
      }),
    [appName]
  )
  createClientCore({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({
        chains,
        options: {
          shimChainChangedDisconnect: true,
          shimDisconnect: true,
          UNSTABLE_shimOnConnectSelectAccount: true,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: appName || "Paper.xyz",
        },
      }),
    ],
    provider,
  })

  return (
    <WagmiConfig client={client}>
      <PaperSDKContext.Provider value={contextValue}>
        {children}
      </PaperSDKContext.Provider>
    </WagmiConfig>
  )
}

export const usePaperSDKContext = (): SDKContext => {
  return useContext(PaperSDKContext)
}
