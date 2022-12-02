import React from "react"

import { CommonPill } from "@/components/Common/CommonStyles"

import { NoDataGuestStyles } from "./NoDataGuestStyles"
const NodataGuests = () => {
  return (
    <NoDataGuestStyles>
      <div>
        <h3>Acces Guest List</h3>
        <p>You don't have any upcoming guest list access NFT's</p>
      </div>
      <div>
        <h2>Learn how to get access</h2>
        <CommonPill className="clickable fill">Learn More</CommonPill>
      </div>
    </NoDataGuestStyles>
  )
}

export default NodataGuests
