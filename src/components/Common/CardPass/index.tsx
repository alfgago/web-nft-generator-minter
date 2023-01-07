import Link from "next/link"

import { CommonPill } from "../CommonStyles"

import { CardPassStyles } from "./CardPassStyles"

const CardPass = ({ pass, event }: any) => {
  if (!event) {
    event = pass.attributes.event.data
      ? pass.attributes.event.data.attributes
      : false
  }
  if (!event) {
    return <h3>No upcoming drawings found for current artist.</h3>
  }
  const venue = event.venue_name ?? ""
  const city = event.address ?? ""
  const date = event.date ?? ""
  const eventName = event.name ?? ""

  const dateFormat = (value: any) => {
    const date = new Date(value)
    const day = date.toLocaleString("default", { day: "2-digit" })
    const month = date.toLocaleString("default", { month: "long" })
    const year = date.toLocaleString("default", { year: "numeric" })
    return day + " " + month + " " + year
  }

  const imgCardPass = () => {
    let value = ""

    try {
      value = pass.attributes.collection_preview_image.data.attributes.url
    } catch (error) {
      value =
        "/aws/default_BG_8e19e47a80.png?updated_at=2022-12-19T17:39:51.850Z"
    }

    return value
  }

  try {
    return (
      <CardPassStyles>
        <>
          <img src={imgCardPass()} alt={pass.collection_name} />
          <div className="inner">
            <div className="titles trap">
              {venue && <div className="venue">{venue}</div>}
              {city && <div className="city"> {city}</div>}
              {date && <div className="date"> {dateFormat(date)}</div>}
            </div>
            <div className="descriptor">
              <div className="timer">{pass.timer}</div>
              <div>{eventName}</div>
            </div>
            <div className="action">
              <Link legacyBehavior href="/">
                <a>
                  <CommonPill className="clickable fill small">
                    Enter Lottery
                  </CommonPill>
                </a>
              </Link>
            </div>
          </div>
          <img
            className="artist-pic"
            src={
              pass.attributes.artist.data.attributes.banner.data.attributes.url
            }
            alt={pass.title}
          />
        </>
      </CardPassStyles>
    )
  } catch (error) {
    console.log(error)
    return <h3>This information is not currently available</h3>
  }
}

export default CardPass
