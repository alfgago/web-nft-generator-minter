import React from "react"

import { CommonPill } from "@/components/Common/CommonStyles"

import { OwnedItemStyles } from "./OwnedItemStyles"

const OwnedItem = ({ itemData }: any) => {
  return (
    <OwnedItemStyles>
      <div className="half-cont nft">
        <div className="image">
          <img src={itemData.nft.image} alt={itemData.nft.title} />
        </div>

        <div className="nft-info-cont grey-card">
          <h3>{itemData.nft.name}</h3>
          <p>Tour: {itemData.nft.tourName}</p>
          <p>Floor price {itemData.nft.price}</p>
        </div>
      </div>

      <span />
      <div className="half-cont grey-card">
        <div className="event-infto-cont half-cont">
          <h3>{itemData.event.timeLeftCalc}</h3>
          <h3>
            {itemData.event.city},{itemData.event.state}
          </h3>
          <h3>{itemData.event.date}</h3>
        </div>
        <div className="owned-info-cont half-cont">
          <p>
            Owned: {itemData.nft.property.owned} of{" "}
            {itemData.nft.property.total}
          </p>
          <p>
            Staked: {itemData.nft.stake.staked} of {itemData.nft.stake.total}
          </p>
          <CommonPill className="clickable fill">Stake to enter</CommonPill>
          <p>
            Chance of winning <span>{itemData.chanceOfWinning}%</span>
          </p>
        </div>
      </div>
    </OwnedItemStyles>
  )
}

export default OwnedItem
