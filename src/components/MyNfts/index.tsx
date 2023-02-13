import React, { useEffect, useState } from "react"
import axios from "axios"
import { ReactSVG } from "react-svg"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

import { CommonPill } from "../Common/CommonStyles"
import SimpleHeader from "../Common/SimpleHeader"

import OwnedLottery from "./OwnedLottery/OwnedLottery"
import MyNftGuestsList from "./GuestsList"
import { MyNtfStyles } from "./MyNftStyles"
import ShowNfts from "./ShowMyNfts"

const MyNfts = () => {
  const [nfts, setNfts] = useState([])
  const { address, isConnected } = useAccount()

  const { disconnect } = useDisconnect()

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {
    async function getNFTs() {
      const { data } = await axios.get("/api/nfts/owned?address=" + address)
      setNfts(data)
    }
    getNFTs()
  }, [])

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
          <ShowNfts items={nfts} />
          <MyNftGuestsList />
          <OwnedLottery />
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
