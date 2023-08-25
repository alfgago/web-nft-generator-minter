/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { configureChains, createClient, WagmiConfig } from "wagmi"
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { alchemyProvider } from "wagmi/providers/alchemy"

import { PaperEmbeddedWalletSdk } from "@paperxyz/embedded-wallet-service-sdk"
import { PaperEmbeddedWalletWagmiConnector } from "@paperxyz/embedded-wallet-service-wagmi"
import { goerli, polygon } from "@wagmi/chains"

interface SDKContext {
  chainName: any
  setChainName: Dispatch<SetStateAction<any>>
  clientId: string
  appName: string
  user: any
  setUser: Dispatch<SetStateAction<any>>
  paperSdk: any
}
const PaperSDKContext = createContext<SDKContext>({
  chainName: "Polygon",
  setChainName: () => {},
  clientId: "",
  appName: "",
  user: null,
  setUser: () => {},
  paperSdk: null,
})

export interface PaperProviderProps {
  chainName?: any
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
  const [chainName_, setChainName] = useState<any>(chainName)
  const [paperSdk, setPaperSdk] = useState({})
  const [user, setUser] = useState(null)

  const contextValue = useMemo(
    () => ({
      chainName: chainName_,
      setChainName,
      appName: appName,
      clientId: clientId,
      user: user,
      setUser,
      paperSdk: paperSdk,
    }),
    [chainName_, appName, clientId, paperSdk, user]
  )

  useEffect(() => {
    const sdk = new PaperEmbeddedWalletSdk({
      clientId: clientId,
      chain: chainName,
    })
    console.log("Paper SDK ", sdk)
    setPaperSdk(sdk)
  }, [])

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
          new PaperEmbeddedWalletWagmiConnector({
            chains,
            options: {
              chain: chainName,
              clientId: clientId,
            },
          }),
          new MetaMaskConnector({
            chains,
            options: {
              // @ts-ignore
              shimChainChangedDisconnect: true,
              shimDisconnect: true,
              UNSTABLE_shimOnConnectSelectAccount: true,
            },
          }),
          /* new WalletConnectConnector({
            chains,
            options: {
              qrcode: true,
            },
          }),
          new CoinbaseWalletConnector({
            chains,
            options: {
              appName: appName || "PlusOne",
            },
          }),*/
        ],
        provider,
        webSocketProvider,
      }),
    [appName]
  )

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
