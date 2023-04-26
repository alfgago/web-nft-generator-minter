import React from "react"

import { CommonPill } from "@/components/Common/CommonStyles"
import Countdown from "@/components/Common/CountDown"
import P1Image from "@/components/Common/P1Image"
import cleanUrl from "@/utils/cleanUrl"

import { OwnedItemStyles } from "./OwnedItemStyles"

const OwnedItem = ({ itemData, eventData }: any) => {
  console.log("itemData", itemData)
  const image = cleanUrl(itemData.image)
  const passTitle = itemData.name
  const passPrice = "$50"

  const eventInfo = eventData.attributes
  const enventLocation = eventInfo.city
  const eventDate = eventInfo.date
  const owned = 9
  const participatingWith = 9
  const totalPasses = 100
  const winnersAmount = 10

  const month = new Date(eventDate).toLocaleString("default", {
    month: "long",
  })
  const day = new Date(eventDate).toLocaleString("default", {
    day: "2-digit",
  })

  const numDays = 30
  const isStakeable = () => {
    const today = new Date()
    const xDaysFromToday = new Date(
      today.getTime() + numDays * 24 * 60 * 60 * 1000
    )
    const event = new Date(eventDate)

    return event >= today && event <= xDaysFromToday
  }

  return (
    <OwnedItemStyles>
      <div className="half-cont nft">
        <div className="image">
          <P1Image src={image} alt={passTitle} />
        </div>

        <div className="nft-info-cont grey-card">
          <h3>{passTitle}</h3>
          <h3>
            <div>{enventLocation}</div> {`${day}  ${month}`}
          </h3>
          <p>Floor price {passPrice}</p>
        </div>
        <span />
      </div>

      <div className="half-cont grey-card">
        <div className="event-infto-cont half-cont">
          <div className="countdown">
            <div className="tit">Countdown</div>
            <Countdown targetDate={eventDate} triggerAction={false} />
          </div>

          <div className="chances">
            <p>{winnersAmount} Winners</p>
            <div>Total passes: {totalPasses}</div>
          </div>
        </div>
        <div className="owned-info-cont half-cont">
          <div className="chances">
            <p>
              Participating with: {participatingWith} of {owned}
            </p>

            <p className="perc">
              Chance of winning:{" "}
              <b>{Math.round((participatingWith / winnersAmount) * 100)}%</b>
              <div className="desc">
                Increase your chances by entering with multiple passes
              </div>
            </p>
          </div>
          {isStakeable() ? (
            <CommonPill className="clickable fill">Enter Giveaway</CommonPill>
          ) : (
            <>
              <CommonPill
                className="disabled"
                title="Available 48 hours before event"
              >
                Enter Giveaway
              </CommonPill>
            </>
          )}
        </div>
      </div>
    </OwnedItemStyles>
  )
}

export default OwnedItem
