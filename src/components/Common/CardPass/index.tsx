import Link from "next/link"

import { CommonPill } from "../CommonStyles"

import { CardPassStyles } from "./CardPassStyles"

const CardPass = ({ pass }: any) => {
  const dateFormat = (value: any) => {
    const date = new Date(value)
    const day = date.toLocaleString("default", { day: "2-digit" })
    const month = date.toLocaleString("default", { month: "long" })
    const year = date.toLocaleString("default", { year: "numeric" })
    return day + " " + month + " " + year
  }

  // console.log(pass.attributes.event.data.attributes.name)
  return (
    <>
      {pass != undefined && (
        <CardPassStyles>
          <img
            src={pass.attributes.collection_preview_image.data.attributes.url}
            alt={pass.collection_name}
          />
          {pass.attributes.event.data != null ? (
            <div className="inner">
              <div className="titles trap">
                <div className="venue">
                  {pass.attributes.event.data.attributes.venue_name},
                </div>
                <div className="city">
                  {pass.attributes.event.data.attributes.city},
                </div>
                <div className="date">
                  {dateFormat(pass.attributes.event.data.attributes.date)}
                </div>
              </div>
              <div className="descriptor">
                <div className="timer">{pass.timer}</div>
                <div>{pass.attributes.event.data.attributes.name}</div>
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
          ) : (
            <p>No event register</p>
          )}

          <img className="artist-pic" src={pass.artistImage} alt={pass.title} />
        </CardPassStyles>
      )}
    </>
  )
}

export default CardPass
