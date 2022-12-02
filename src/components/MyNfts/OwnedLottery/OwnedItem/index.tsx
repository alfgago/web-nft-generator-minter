import React from "react"

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
        <div className="event-infto-cont">
          <h3>{itemData.event.timeLeftCalc}</h3>
          <h3>
            {itemData.event.city},{itemData.event.state}
          </h3>
          <h3>{itemData.event.date}</h3>
        </div>
        <div className="owned-info-cont">
          <p>Owned:</p>
          <p>Staked:</p>
          <p>button</p>
          <p>Chance of winning </p>
        </div>
      </div>
    </OwnedItemStyles>
  )
}

export default OwnedItem
