import React from "react"

import { CommonPill } from "@/components/Common/CommonStyles"
import Countdown from "@/components/Common/CountDown"

import { OwnedItemStyles } from "./OwnedItemStyles"

const OwnedItem = ({ itemData, eventData }: any) => {
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
  const getTime = (targetTime: any, now: any = new Date()) => {
    const remainingTime = targetTime.getTime() - now.getTime()
    const seconds = Math.floor(remainingTime / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    return { hours: hours, minutes: minutes, seconds: seconds }
  }

  const remainingTime = getTime(new Date(eventDate))

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
          {remainingTime.minutes < 2880 && remainingTime.minutes > 0 && (
            <CommonPill className="clickable fill">Stake to enter</CommonPill>
          )}

          <p>
            Chance of winning{" "}
            <span>{Math.round((totalPasses / winnersAmount) * 100)}%</span>
          </p>
        </div>
      </div>
    </OwnedItemStyles>
  )
}

export default OwnedItem
