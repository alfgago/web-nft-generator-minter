import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAccount } from "wagmi"

import { CommonPill } from "@/components/Common/CommonStyles"
import Countdown from "@/components/Common/CountDown"
import P1Image from "@/components/Common/P1Image"
import cleanUrl from "@/utils/cleanUrl"

import { OwnedItemStyles } from "./OwnedItemStyles"

const OwnedItem = ({ itemData, eventData, nftData = false }: any) => {
  const [participants, setParticipants] = useState<any>([])
  const [nft, setNft] = useState<any>(null)
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)
  const { address } = useAccount()

  async function fetchParticipants() {
    const { data } = await axios.get(
      "/api/airdrops/get-participants?event=" + eventData.id
    )
    // Update the state with the response data
    setParticipants(data.data)
  }
  async function fetchNft() {
    if (nftData) {
      setNft(nftData)
      return
    }
    const nftResponse = await axios.get(
      "/api/nfts/by-image-url?image=" + itemData.image.replace("ipfs://", "")
    )
    setNft(nftResponse.data)
  }
  useEffect(() => {
    fetchParticipants()
    fetchNft()
  }, [nftData])

  const enterGiveaway = async () => {
    const res = await axios.post("/api/airdrops/subscribe", {
      wallet: address,
      // email: values.email,
      event: eventData.id,
      circle_nft: nft.id,
    })
    if (res.data) {
      setSubscribeSuccess(true)
    }
  }

  const isEntered = () => {
    if (subscribeSuccess) {
      return true
    }
    if (participants.length && nft) {
      for (const participant of participants) {
        if (
          participant.attributes?.circle_nft &&
          participant.attributes?.circle_nft?.data?.id === nft.id
        ) {
          return true
        }
      }
    }
    return false
  }

  const image = cleanUrl(itemData.image)
  const passTitle = itemData.name
  const passPrice = "$50"

  const eventInfo = eventData.attributes
  const enventLocation = eventInfo.city
  const eventDate = eventInfo.date
  const totalPassesParticipating = participants?.length ?? 0
  const winnersAmount = eventInfo.giveaway_slots

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

  function calculateLotteryChances() {
    const totalSlots = subscribeSuccess
      ? totalPassesParticipating + 1
      : totalPassesParticipating
    const slotsOwned = 1
    if (totalSlots === 0 || totalSlots - 1 === 0) {
      return 0 // Return 0% in case of division by zero
    }
    const winnersAmount = 1
    const chancesOfWinning = (winnersAmount / totalSlots) * slotsOwned * 100

    if (isNaN(chancesOfWinning)) {
      return 0 // Return 0% if chancesOfWinning is NaN
    }
    if (chancesOfWinning > 100) {
      return 100 // Return 100% if chancesOfWinning is over 100
    }

    return parseFloat(chancesOfWinning.toFixed(2)) // Round to 2 decimal places and return as a number
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
            <div>Participating: {totalPassesParticipating}</div>
          </div>
        </div>
        <div className="owned-info-cont half-cont">
          <div className="chances">
            <div className="perc">
              Chance of winning: <b>{calculateLotteryChances()}%</b>
              <div className="desc">
                Increase your chances by entering with multiple passes
              </div>
            </div>
          </div>
          {!isEntered() ? (
            <>
              {isStakeable() ? (
                <CommonPill
                  className="clickable blue fill"
                  onClick={() => enterGiveaway()}
                >
                  Enter Giveaway
                </CommonPill>
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
            </>
          ) : (
            <>
              <CommonPill className="disabled green">Entered</CommonPill>
            </>
          )}
        </div>
      </div>
    </OwnedItemStyles>
  )
}

export default OwnedItem
