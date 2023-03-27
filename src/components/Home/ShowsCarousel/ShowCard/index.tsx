import React from "react"
import Image from "next/image"
import Link from "next/link"

import { CommonPill } from "@/components/Common/CommonStyles"
import cleanUrl from "@/utils/cleanUrl"

import { ShowCardStyles } from "./ShowCardStyles"

const dateFormat = (date: any) => {
  const d = new Date(date)
  const month = d.toLocaleString("default", { month: "short" })
  const day = d.toLocaleString("default", { day: "numeric" })
  const year = d.toLocaleString("default", { year: "numeric" })
  return `${month} ${day} ${year}`
}

const EventCard = ({ eventData }: any) => {
  let imageUrl =
    eventData.attributes.artist.data.attributes.profile_picture.data != null
      ? eventData.attributes.artist.data.attributes.profile_picture.data
          .attributes.url
      : "https://plusone-public.s3.amazonaws.com/default_BG_edf8345a11.png?updated_at=2023-02-16T22:07:32.343Z"
  imageUrl =
    eventData?.attributes?.image?.data != null
      ? eventData?.attributes?.image?.data.attributes.url
      : imageUrl

  const alt = eventData.attributes.artist.data.attributes.name + " banner"
  const eventName = eventData.attributes.name
  const eventDate = dateFormat(eventData.attributes.date)
  const country = eventData.attributes.country
  const city = eventData.attributes.city
  const eventArtist = eventData.attributes.artist.data.attributes.name
  const artistSlug = eventData.attributes.artist.data.attributes.slug
  return (
    <ShowCardStyles>
      <div className="img-cont">
        <Image
          src={cleanUrl(imageUrl)}
          alt={alt}
          quality={90}
          width={220}
          height={165}
        />
        <Link
          href={"/artist/" + artistSlug + "#upcoming"}
          title={"Access " + eventName}
        >
          <CommonPill className="clickable small">Access Show</CommonPill>
        </Link>
        <div className="text">
          <div className="venue">{eventName}</div>
          {city && (
            <div className="address">
              {city}, {country}
            </div>
          )}
          <div className="date">{dateFormat(eventDate)}</div>
        </div>
      </div>
    </ShowCardStyles>
  )
}

export default EventCard
