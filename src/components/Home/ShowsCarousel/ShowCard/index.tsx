import React from "react"
import Image from "next/image"
import Link from "next/link"

import { CommonPill } from "@/components/Common/CommonStyles"
import cleanUrl from "@/utils/cleanUrl"

import { ShowCardStyles } from "./ShowCardStyles"

const EventCard = ({ eventData }: any) => {
  console.log(eventData)
  const imageUrl =
    eventData.attributes.artist.data.attributes.profile_picture.data != null
      ? eventData.attributes.artist.data.attributes.profile_picture.data
          .attributes.url
      : "https://plusone-public.s3.amazonaws.com/default_BG_edf8345a11.png?updated_at=2023-02-16T22:07:32.343Z"

  const alt = eventData.attributes.artist.data.attributes.name + " banner"
  const eventName = eventData.attributes.name
  const eventDate = new Date(eventData.attributes.date)
  const eventAddress = eventData.attributes.address
  const eventArtist = eventData.attributes.artist.data.attributes.name
  const artistSlug = eventData.attributes.artist.data.attributes.slug
  return (
    <ShowCardStyles>
      <div className="img-cont">
        <Image src={imageUrl} alt={alt} quality={90} width={190} height={190} />
      </div>
      <div className="data-cont">
        <div className="titles">
          <div className="artist">{eventArtist}</div>
          <div className="eventname">{eventName}</div>

          {eventAddress && <div className="address">{eventAddress}</div>}

          {eventDate && (
            <div className="date">{eventDate.toLocaleString("en-US")}</div>
          )}
        </div>
        <Link href={"/artist/" + artistSlug} title={"Access " + eventName}>
          <CommonPill className="clickable small">Access</CommonPill>
        </Link>
      </div>
    </ShowCardStyles>
  )
}

export default EventCard
