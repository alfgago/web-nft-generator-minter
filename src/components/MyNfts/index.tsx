import React from "react"
import { ReactSVG } from "react-svg"

import SimpleHeader from "../Common/SimpleHeader"

import OwnedLottery from "./OwnedLottery/OwnedLottery"
import MyNftGuestsList from "./GuestsList"
import { MyNtfStyles } from "./MyNftStyles"
import ShowNfts from "./ShowMyNfts"

const MyNfts = () => {
  const userName = "Jhon Doe"
  return (
    <MyNtfStyles>
      <SimpleHeader title="My NFT's" backgroundColor="blue" textAlign="left">
        <div className="subt-container">
          <h3>{userName}</h3>
          <div className="settings">
            <ReactSVG src="/assets/vectors/settings-icon.svg" />
            <p>Update Profile</p>
          </div>
        </div>
      </SimpleHeader>
      <ShowNfts />
      <MyNftGuestsList />
      <OwnedLottery />
    </MyNtfStyles>
  )
}

export default MyNfts
