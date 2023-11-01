import Image from "next/image"
import Link from "next/link"
import { useWindowSize } from "usehooks-ts"

import PassDescription from "@/components/PassDescription"
import PassPreview from "@/components/PassPreview"
import Tooltip from "@/components/Tooltip"
import cleanUrl from "@/utils/cleanUrl"
import dateFormat from "@/utils/dateFunctions"

import { CommonPill } from "../CommonStyles"

import { CardPassStyles } from "./CardPassStyles"

const CardPass = ({ pass, event, isGiveaway = false, isHome = false }: any) => {
  const { width } = useWindowSize()
  const isMobile = width < 1080

  if (!event) {
    event = pass.attributes.event.data
      ? pass.attributes.event.data.attributes
      : false
  }
  const title = pass.attributes.collection_name
    .replace("Guest Pass", "<br />Guest Pass")
    .replace("Circle Pass", "<br />Circle Pass")
  const price = pass.attributes.initial_price
  const size = pass.attributes.collection_size
  const eventName = event.name ?? ""
  const eventDate = event.date ?? ""
  const date = pass.attributes.drop_date ?? ""
  const eventImage = event?.image?.data?.attributes?.url

  const imgCardPass = cleanUrl(
    pass?.attributes?.preview_image_url ??
      "https://plusonemusic.io/aws/default_BG_8e19e47a80.png?updated_at=2022-12-19T17:39:51.850Z"
  )

  try {
    return (
      <CardPassStyles>
        {isMobile && title && (
          <div
            className="mobile-title title"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        )}
        <div className="flex">
          {imgCardPass.startsWith("https://plusonemusic.io") ? (
            <Image
              src={imgCardPass}
              alt={title + " preview"}
              width={300}
              height={300}
              quality={90}
              className="pic"
            />
          ) : (
            <img
              src={imgCardPass}
              alt={title + " preview"}
              width={300}
              height={300}
              className="pic"
            />
          )}
          <div className="inner-card">
            <div className="titles trap">
              {!isMobile && title && (
                <div
                  className="title"
                  dangerouslySetInnerHTML={{
                    __html: title,
                  }}
                />
              )}
              {isGiveaway && date && (
                <div className="date">
                  {" "}
                  <p>
                    Next golden pass <br />
                    giveaway date:{" "}
                  </p>
                  <b>{dateFormat(date)}</b>
                </div>
              )}
              {!isGiveaway && date && (
                <div className="date">
                  {" "}
                  <p>Passes release date: </p>
                  <b>{dateFormat(date)}</b>
                </div>
              )}
            </div>
            <div className="descriptor">
              <div className="timer">{pass.timer}</div>
              {size && <div className="size">Size: {size}</div>}
              {isGiveaway && price && (
                <div className="price">Circle pass: $50</div>
              )}
              {!isGiveaway && price && (
                <div className="price">Average pass price: $50</div>
              )}
            </div>
            <div className="actions">
              <Link href={`/pass/${pass.attributes.contract_address}`}>
                <CommonPill className="clickable fill small">
                  {!isHome ? "Buy Now" : "Enter Circle"}
                </CommonPill>
              </Link>
              {isGiveaway && (
                <Tooltip text="If you already own a Circle Pass, connect your wallet to enter the giveaway." />
              )}
            </div>
          </div>
          <div className="more">
            {isGiveaway && event ? (
              <div className="golden-preview">
                <PassPreview
                  previewUrl={eventImage}
                  name={eventName}
                  city={event.city}
                  country={event.country}
                  date={event.date}
                  template="golden"
                />
              </div>
            ) : (
              <Image
                className="pic"
                src={cleanUrl(
                  pass.attributes.artist.data.attributes.banner.data.attributes
                    .url
                )}
                alt={
                  pass.attributes.artist.data.attributes.name +
                  " Plus One image"
                }
                quality={90}
                width={300}
                height={300}
              />
            )}
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
        <PassDescription pass={pass} isHome={isHome} />
      </CardPassStyles>
    )
  } catch (error) {
    console.log(error)
    return <h3>This information is not currently available</h3>
  }
}

export default CardPass
