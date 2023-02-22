import React from "react"
import LazyLoad from "react-lazyload"

import { EventCardStyles } from "./EventCardStyles"

const EventCard = ({ eventData }: any) => {
  const eventName = eventData.attributes.name

  return (
    <EventCardStyles>
      <LazyLoad height={200}>
        <div className="img-cont"> image</div>
        <div className="data-cont"> {eventName}</div>
      </LazyLoad>
    </EventCardStyles>
  )
}

export default EventCard
