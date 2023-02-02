import React from "react"
import { ReactSVG } from "react-svg"
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

import { CommonPill } from "../Common/CommonStyles"
import SimpleHeader from "../Common/SimpleHeader"

import OwnedLottery from "./OwnedLottery/OwnedLottery"
import MyNftGuestsList from "./GuestsList"
import { MyNtfStyles } from "./MyNftStyles"
import ShowNfts from "./ShowMyNfts"
import GroupChat from "../GroupChat"

const MyNfts = () => {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })

  const { disconnect } = useDisconnect()

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  return (
    <MyNtfStyles>
      <SimpleHeader title="My NFT's" backgroundColor="blue" textAlign="left">
        <div className="subt-container">
          <h3>{address}</h3>
          {isConnected && (
            <div className="disconnect">
              <button onClick={() => disconnect()}>
                Disconnect your wallet
              </button>
            </div>
          )}
        </div>
      </SimpleHeader>
      {isConnected ? (
        <>
          <ShowNfts />
          <MyNftGuestsList />
          <OwnedLottery />
          <GroupChat />
        </>
      ) : (
        <section className="disconnected">
          <div className="content">
            <p>Please connect your wallet to check out your NFTs</p>
            <button onClick={() => connect()}>
              <CommonPill className="clickable small">
                <span className="with-icon">
                  <ReactSVG src="/assets/icons/wallet.svg" />
                  Connect Wallet
                </span>
              </CommonPill>
            </button>
          </div>
        </section>
      )}
    </MyNtfStyles>
  )
}

export default MyNfts
