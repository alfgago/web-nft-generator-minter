import React, { useEffect, useState } from "react"
import axios from "axios"

import SimpleHeader from "../Common/SimpleHeader"

import EventCard from "./EventCard"
import { EventListingStyles, ListingStyles } from "./EventListingStyles"

const EventListing = () => {
  const [events, setEvents] = useState([])

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/shows?limit=10&sort=date&page=1`)
      const eventsReponse = data.data
      setEvents(eventsReponse)

      console.log(data)
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <EventListingStyles>
      <SimpleHeader title="Events" textAlign="left" />

      <ListingStyles>
        <div className="content">
          <div className="list">
            {events.map((event: any, index: number) => {
              return <EventCard key={"EnventItem" + index} eventData={event} />
            })}
          </div>
        </div>
      </ListingStyles>
    </EventListingStyles>
  )
}

export default EventListing
