import React from "react"

import { CommonPill } from "@/components/Common/CommonStyles"

import { NoDataGuestStyles } from "./NoDataGuestStyles"
const NodataGuests = () => {
  return (
    <NoDataGuestStyles>
      <div>
        <h3>Access Guest List</h3>
        <p>
          You don't own any passes which provide guest list access. Purchase a
          guest pass or enter an upcoming giveaway below for a chance to win a
          golden guest pass.
        </p>
      </div>
      <div>
        <h2>Learn how to get access</h2>
        <CommonPill className="clickable fill">Learn More</CommonPill>
      </div>
    </NoDataGuestStyles>
  )
}

export default NodataGuests
