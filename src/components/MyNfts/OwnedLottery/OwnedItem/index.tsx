import React from "react"

import { CommonPill } from "@/components/Common/CommonStyles"
import Countdown from "@/components/Common/CountDown"

import { OwnedItemStyles } from "./OwnedItemStyles"

const OwnedItem = ({ itemData, eventData }: any) => {
  const event = itemData.attributes
  const passes = itemData.passes
  console.log("itemData")
  console.log(eventData)
  console.log(itemData)

  const passInfo = itemData.attributes
  const image = passInfo.preview_image_url
  const passTitle = passInfo.collection_name
  const passPrice = passInfo.initial_price

  const eventInfo = eventData.attributes
  const enventLocation = eventInfo.venue_name
  const eventDate = eventInfo.date
  const totalPasses = passInfo.collection_size
  const winnersAmount = passInfo.winners

  const month = new Date(eventDate).toLocaleString("default", {
    month: "long",
  })
  const day = new Date(eventDate).toLocaleString("default", {
    day: "2-digit",
  })

  return (
    <OwnedItemStyles>
      <div className="half-cont nft">
        <div className="image">
          <img src={image} alt={passTitle} />
        </div>

        <div className="nft-info-cont grey-card">
          <h3>{passTitle}</h3>
          <p>Floor price {passPrice}</p>
        </div>
        <span />
      </div>

      <div className="half-cont grey-card">
        <div className="event-infto-cont half-cont">
          <h3>
            <Countdown targetDate={eventDate} triggerAction={false} />
          </h3>

          <h3>{enventLocation}</h3>
          <h3>{`${day}  ${month}`}</h3>
        </div>
        <div className="owned-info-cont half-cont">
          <p>
            Owned: {0} of {totalPasses}
          </p>
          <p>
            Staked: {9} of {10}
          </p>
          <CommonPill className="clickable fill">Stake to enter</CommonPill>
          <p>
            Chance of winning{" "}
            <span>{(totalPasses / winnersAmount) * 100}%</span>
          </p>
        </div>
      </div>
    </OwnedItemStyles>
  )
}

export default OwnedItem
