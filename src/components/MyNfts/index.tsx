import React from "react"

import SimpleHeader from "../Common/SimpleHeader"

import { MyNtfStyles } from "./MyNftStyles"
import ShowNfts from "./ShowMyNfts"

const MyNfts = () => {
  return (
    <MyNtfStyles>
      <SimpleHeader title="My NFT's" backgroundColor="blue" textAlign="left">
        <div className="subt-container">
          <h3>#User</h3>
          <a href="#"> Update Profile</a>
        </div>
      </SimpleHeader>
      <ShowNfts />
    </MyNtfStyles>
  )
}

export default MyNfts
