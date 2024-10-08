import React, { useEffect, useState } from "react"
import axios from "axios"
import { ReactSVG } from "react-svg"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

import { CommonPill } from "../Common/CommonStyles"
import Modal from "../Common/Modal"
import SimpleHeader from "../Common/SimpleHeader"

import MyPerks from "./MyPerks/MyPerks"
import OwnedLottery from "./OwnedLottery/OwnedLottery"
import EditProfileForm from "./EditProfileForm"
import MyNftGuestsList from "./GuestsList"
import { MyNtfStyles } from "./MyNftStyles"
import ShowNfts from "./ShowMyNfts"

const MyNfts = () => {
  const [toggleEdit, setToggleEdit] = useState(false)
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
    if (address) {
      getNFTs()
    }
  }, [address])

  return (
    <MyNtfStyles>
      <SimpleHeader
        title="My Passes"
        backgroundColor="blue"
        textAlign="left"
        subt-container
        id="scroll-trigger"
      >
        <div className="subt-container">
          <h3>{address}</h3>
          {isConnected && (
            <>
              <CommonPill
                className="edit-profile-button clickable small"
                onClick={() => setToggleEdit(true)}
              >
                <ReactSVG className="edit icon" src="/assets/icons/edit.svg" />
                Edit My Profile
              </CommonPill>
              <div className="disconnect">
                <button onClick={() => disconnect()}>
                  Disconnect your wallet
                </button>
              </div>
            </>
          )}
        </div>
      </SimpleHeader>
      {isConnected ? (
        <>
          <ShowNfts items={nfts} />
          <MyNftGuestsList myNfts={nfts} />
          <MyPerks items={nfts} />
          <OwnedLottery items={nfts} />
        </>
      ) : (
        <section className="disconnected">
          <div className="content">
            <p>Please connect your wallet to check out your Passes</p>
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

      {toggleEdit && (
        <Modal setIsOpen={setToggleEdit} title="Edit User Profile">
          <EditProfileForm wallet={address} />
        </Modal>
      )}
    </MyNtfStyles>
  )
}

export default MyNfts
