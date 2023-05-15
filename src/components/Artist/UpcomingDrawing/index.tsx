import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"

import { CommonPill } from "@/components/Common/CommonStyles"
import Countdown from "@/components/Common/CountDown"
import PassPreview from "@/components/PassPreview"
import Tooltip from "@/components/Tooltip"
import dateFormat from "@/utils/dateFunctions"

import {
  BoxDrawing,
  DrawRow,
  UpcomingDrawingStyles,
} from "./UpcomingDrawingStyles"

const UpcomingDrawing = ({ artistId }: any) => {
  const [show, setShow] = useState<any>(null)
  const [pass, setPass] = useState<any>(null)

  async function fetchShow() {
    const { data } = await axios.get(
      "/api/shows?limit=1&future=true&artist=" + artistId
    )
    // Update the state with the response data
    const show = data.data.length ? data.data[0] : ""
    setShow(show)
  }
  async function fetchPass() {
    const { data } = await axios.get(
      "/api/passes?limit=1&type=Circle&artist=" + artistId
    )
    // Update the state with the response data
    const pass = data.data.length ? data.data[0] : ""
    setPass(pass)
  }

  useEffect(() => {
    fetchShow()
    fetchPass()
  }, [])

  const hasDrawing = pass && show

  return (
    <UpcomingDrawingStyles>
      <div className="content">
        <h2 className="title">Upcoming Giveaways</h2>
        <p className="description">
          You must own an artist's circle pass to enter to win single event{" "}
          <span className="golden">golden</span> guest pass giveaways{" "}
          <Tooltip text="Winning circle users will be automatically sent a one-of-a-kind single event guest pass as soon as the countdown clock expires." />
        </p>
        <div>
          {hasDrawing ? (
            <DrawingData show={show} pass={pass} />
          ) : (
            <p className="not-found">
              There are no upcoming giveaways for this artist.
            </p>
          )}
        </div>
      </div>
    </UpcomingDrawingStyles>
  )
}

export default UpcomingDrawing

export const DrawingData = ({ show, pass }: any) => {
  const [canGetLottery, setCanGetLottery] = useState(true)
  const timeCountEnd = () => {
    setCanGetLottery(false)
  }

  // const currentDate = new Date()
  const before48Hours = (currentDate: Date) => {
    return new Date(currentDate.getTime() - 48 * 60 * 60 * 1000)
  }

  const getTime = (targetTime: any, now: any) => {
    const remainingTime = targetTime.getTime() - now.getTime()
    const seconds = Math.floor(remainingTime / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    return { hours: hours, minutes: minutes, seconds: seconds }
  }

  const localDate = new Date()
  /* used in the request to return 
  only the posible passes that end in more than 48h*/
  const formatedDate =
    localDate.getFullYear() +
    "-" +
    localDate.toLocaleString("default", { month: "2-digit" }) +
    "-" +
    localDate.toLocaleString("default", { day: "2-digit" })

  const date = show.attributes.date
  const dateBeforeCurrent = before48Hours(new Date(date)) // Checks if 48hr before
  const totalTime = getTime(new Date(dateBeforeCurrent), new Date())
  /* validate if the lottery time hasn't ended
                and the lottery is in less than 5 days */

  const days5 = totalTime.minutes > 0 && totalTime.minutes < 7200

  const namePass = pass.attributes.collection_name
  const price = pass.attributes.initial_price
  const contactAddres = pass.attributes.contract_address

  const month = new Date(date).toLocaleString("default", {
    month: "long",
  })
  const day = new Date(date).toLocaleString("default", {
    day: "2-digit",
  })
  const passesAmount = pass.attributes.collection_size
  const winnersAmount = pass.attributes.winners

  const showLocation = show.attributes.name

  const eventName = show?.attributes?.name ?? ""
  const eventDate = show?.attributes?.date ?? ""
  const eventImage = show?.attributes?.image?.data?.attributes?.url
  const country = show?.attributes?.country ?? ""
  const city = show?.attributes?.city ?? ""

  return (
    <BoxDrawing>
      <DrawRow>
        <div className="column1">
          <div className="main-cont">
            <div className="img-container">
              <PassPreview
                previewUrl={eventImage}
                name={eventName}
                city={city}
                country={country}
                date={eventDate}
                template="golden"
              />
            </div>
            <div className="info">
              <h3>{namePass}</h3>
              <div className="info-pass">
                <p>Plus Perks: Artist Meet & Greet</p>
              </div>
            </div>
          </div>
          <div className="cols-cont">
            <div className="column2">
              <div className="date">{dateFormat(date)}</div>
              <div className="time">
                <Countdown
                  triggerAction={timeCountEnd}
                  targetDate={dateBeforeCurrent}
                />
              </div>
              <div className="place">{showLocation}</div>
            </div>
            <div className="column3">
              <div>
                <span>Chance of winning</span>
                <p>100%</p>
              </div>
              <Link href={`/pass/${contactAddres}`}>
                <CommonPill
                  className={`clickable small active ${
                    !canGetLottery ? "disable" : ""
                  }`}
                >
                  Enter Giveaway
                </CommonPill>
              </Link>
              <Tooltip text="If you already own a Circle Pass, connect your wallet to enter the giveaway." />
            </div>
          </div>
        </div>
      </DrawRow>
    </BoxDrawing>
  )
}
