import React from "react"
import Image from "next/image"
import Link from "next/link"

import { CommonPill } from "@/components/Common/CommonStyles"

import { EventCardStyles } from "./EventCardStyles"

const EventCard = ({ eventData }: any) => {
  const imageUrl =
    eventData.attributes.artist.data.attributes.profile_picture.data != null
      ? eventData.attributes.artist.data.attributes.profile_picture.data
          .attributes.url
      : "https://plusone-public.s3.amazonaws.com/default_BG_edf8345a11.png?updated_at=2023-02-16T22:07:32.343Z"

  const alt = eventData.attributes.artist.data.attributes.name + " banner"
  const eventName = eventData.attributes.name
  const eventDate = new Date(eventData.attributes.date)
  const eventAddress = eventData.attributes.address
  const eventDesc = eventData.attributes.description
  const eventArtist = eventData.attributes.artist.data.attributes.name
  const artistPage = eventData.attributes.artist.data.attributes.slug
  return (
    <EventCardStyles>
      <div className="img-cont">
        <Image src={imageUrl} alt={alt} quality={90} width={350} height={350} />
      </div>
      <div className="data-cont">
        <div className="titles">
          <div className="title">{eventName}</div>
          <div className="artist">
            <b>Artist: </b>
            <span>{eventArtist}</span>
          </div>

          {eventDate && (
            <div className="date">
              <b>Event date: </b>
              <span>{eventDate.toLocaleString("en-US")}</span>
            </div>
          )}

          {eventAddress && (
            <div className="address">
              <b>Address: </b>
              <span>{eventAddress}</span>
            </div>
          )}

          {/* {eventDesc && (
              <div className="descrip">
                <b>Description: </b>
                <span>{eventDesc}</span>
              </div>
            )} */}
        </div>
        <div className="bnt-cont">
          <Link legacyBehavior href={`/artist/${artistPage}/#upcoming`}>
            <a>
              <CommonPill className="clickable blue small">
                View more
              </CommonPill>
            </a>
          </Link>
        </div>
      </div>
    </EventCardStyles>
  )
}

export default EventCard
