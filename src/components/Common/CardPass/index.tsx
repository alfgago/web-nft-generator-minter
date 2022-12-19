import Link from "next/link"

import { CommonPill } from "../CommonStyles"

import { CardPassStyles } from "./CardPassStyles"

const CardPass = ({ pass, venue, city, date, eventName }: any) => {
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
        "https://plusone-public.s3.amazonaws.com/default_BG_8e19e47a80.png?updated_at=2022-12-19T17:39:51.850Z"
    }

    return value
  }

  try {
    return (
      <CardPassStyles>
        {pass.attributes.event.data.attributes != null ? (
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
                <Link href="/">
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
                pass.attributes.artist.data.attributes.banner.data.attributes
                  .url
              }
              alt={pass.title}
            />
          </>
        ) : (
          <div className="guests-no-data">
            <h3>The information of this event has not been provided</h3>
          </div>
        )}
      </CardPassStyles>
    )
  } catch (error) {
    return <h3>This information is not currently available</h3>
  }
}

export default CardPass
