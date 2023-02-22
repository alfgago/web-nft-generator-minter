import React from "react"
import Image from "next/image"
import LazyLoad from "react-lazyload"

import cleanUrl from "@/utils/cleanUrl"

import { EventCardStyles } from "./EventCardStyles"

const EventCard = ({ eventData }: any) => {
  console.log(eventData)
  const imageUrl =
    eventData.attributes.artist.data.attributes.profile_picture.data != null
      ? eventData.attributes.artist.data.attributes.profile_picture.data
          .attributes.url
      : "https://plusone-public.s3.amazonaws.com/default_BG_edf8345a11.png?updated_at=2023-02-16T22:07:32.343Z"

  const alt = eventData.attributes.artist.data.attributes.name + " banner"
  const eventName = eventData.attributes.name
  const eventDate = eventData.attributes.date
  const eventAddress = eventData.attributes.address
  const eventDesc = eventData.attributes.description
  return (
    <EventCardStyles>
      <LazyLoad height={200}>
        <div className="img-cont">
          <Image
            src={imageUrl}
            alt={alt}
            quality={90}
            width={350}
            height={350}
          />
        </div>
        <div className="data-cont">
          <div className="title">{eventName}</div>

          <div className="date">
            <b>Event date: </b>
            <span>{eventDate}</span>
          </div>
          {eventAddress && (
            <div className="date">
              <b>Address: </b>
              <span>{eventAddress}</span>
            </div>
          )}

          {eventDesc && (
            <div className="descrip">
              <b>Description: </b>
              <span>{eventDesc}</span>
            </div>
          )}
        </div>
      </LazyLoad>
    </EventCardStyles>
  )
}

export default EventCard
