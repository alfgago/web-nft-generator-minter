import Image from "next/image"
import Link from "next/link"

import PassDescription from "@/components/PassDescription"
import cleanUrl from "@/utils/cleanUrl"

import { CommonPill } from "../CommonStyles"

import { CardPassStyles } from "./CardPassStyles"

const dateFormat = (value: any) => {
  const date = new Date(value)
  const day = date.toLocaleString("default", { day: "2-digit" })
  const month = date.toLocaleString("default", { month: "long" })
  const year = date.toLocaleString("default", { year: "numeric" })
  return day + " " + month + " " + year
}

const CardPass = ({ pass, event }: any) => {
  if (!event) {
    event = pass.attributes.event.data
      ? pass.attributes.event.data.attributes
      : false
  }
  const title = pass.attributes.collection_name
  const price = pass.attributes.initial_price
  const size = pass.attributes.collection_size
  const eventName = event.name ?? ""
  const eventDate = event.date ?? ""
  const date = pass.attributes.drop_date ?? ""

  const imgCardPass = () => {
    let value = ""

    try {
      value =
        pass.attributes.preview_image_url ??
        "/aws/default_BG_8e19e47a80.png?updated_at=2022-12-19T17:39:51.850Z"
    } catch (error) {
      value =
        "/aws/default_BG_8e19e47a80.png?updated_at=2022-12-19T17:39:51.850Z"
    }

    return value
  }

  try {
    return (
      <CardPassStyles>
        <div className="flex">
          <Image
            src={cleanUrl(imgCardPass())}
            alt={title + " preview"}
            quality={90}
            width={300}
            height={300}
          />
          <div className="inner">
            <div className="titles trap">
              {title && <div className="title">{title}</div>}
              {date && <div className="date"> Drop: {dateFormat(date)}</div>}
            </div>
            <div className="descriptor">
              <div className="timer">{pass.timer}</div>
              {size && <div className="size">Size: {size}</div>}
              {price && <div className="price">Floor: {price} eth</div>}
            </div>
            <div className="action">
              <Link href={`/pass/${pass.attributes.contract_address}`}>
                <CommonPill className="clickable fill small">
                  Enter Circle
                </CommonPill>
              </Link>
            </div>
          </div>
          <div className="more">
            <Image
              className="artist-pic"
              src={cleanUrl(
                pass.attributes.artist.data.attributes.banner.data.attributes
                  .url
              )}
              alt={
                pass.attributes.artist.data.attributes.name + " Plus One image"
              }
              quality={90}
              width={300}
              height={300}
            />
            {eventName && (
              <div className="info">
                <div>
                  <b>Upcoming show:</b> {eventName}
                </div>
                <div>
                  <b>Show date:</b> {dateFormat(eventDate)}
                </div>
              </div>
            )}
          </div>
        </div>
        <PassDescription pass={pass} />
      </CardPassStyles>
    )
  } catch (error) {
    console.log(error)
    return <h3>This information is not currently available</h3>
  }
}

export default CardPass
