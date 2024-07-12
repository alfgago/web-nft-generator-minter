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
import { ChainId, ThirdwebProvider, useUser, useMetamask, useDisconnect, useAddress } from "@thirdweb-dev/react"

interface SDKContext {
  chainName: any
  setChainName: Dispatch<SetStateAction<any>>
  clientId: string
  appName: string
  user: any
  setUser: Dispatch<SetStateAction<any>>
}
const SDKContext = createContext<SDKContext>({
  chainName: ChainId.Polygon,
  setChainName: () => { },
  clientId: "",
  appName: "",
  user: null,
  setUser: () => { },
})

export interface ProviderProps {
  chainName?: any
  appName?: string
  clientId?: string
}

/**
 * @typedef ProviderProps
 * @type {object}
 * @property {string} appName - The name used to display
 * @property {string}  chainName - deprecated. Not used anymore
 * @property {string} clientId - deprecated. Used by VerifyOwnershipWithPaper which has since been deprecated
 * @param {ProviderProps} props
 */
export const SDKProvider = ({
  appName = "",
  chainName = ChainId.Goerli,
  clientId = "",
  children,
}: React.PropsWithChildren<ProviderProps>) => {
  const [chainName_, setChainName] = useState<any>(chainName)
  const [user, setUser] = useState(null)
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();

  useEffect(() => {
    if (address) {
      setUser(address);
    } else {
      setUser(null);
    }
  }, [address]);

  const contextValue = useMemo(
    () => ({
      chainName: chainName_,
      setChainName,
      appName: appName,
      clientId: clientId,
      user: user,
      setUser,
    }),
    [chainName_, appName, clientId, user]
  )

  return (
    <ThirdwebProvider desiredChainId={chainName_}>
      <SDKContext.Provider value={contextValue}>
        {children}
      </SDKContext.Provider>
    </ThirdwebProvider>
  )
}

export const useSDKContext = (): SDKContext => {
  return useContext(SDKContext)
}
