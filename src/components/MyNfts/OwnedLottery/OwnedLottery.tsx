import React from "react"

import { OwnedLotteryStyles } from "./OwnedLotteryStyles"

const OwnedLottery = () => {
  return (
    <OwnedLotteryStyles>
      <div className="content">
        <div className="header-cont">
          <div>
            <h2>Owned Lottery NFT's</h2>
          </div>
          <div className="filters">
            <span>All</span>
            <span>Active</span>
            <span>Upcoming</span>
          </div>
        </div>
      </div>
    </OwnedLotteryStyles>
  )
}

export default OwnedLottery
