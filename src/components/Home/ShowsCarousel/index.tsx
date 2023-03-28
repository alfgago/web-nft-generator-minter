import React, { useEffect, useState } from "react"
import axios from "axios"
import Marquee from "react-fast-marquee"
import { ReactSVG } from "react-svg"
import { useWindowSize } from "usehooks-ts"

import EventCard from "./ShowCard"
import { ShowsCarouselStyles } from "./ShowsCarouselStyles"

const ShowsCarousel = () => {
  const [events, setEvents] = useState([])

  const { width } = useWindowSize()

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/shows?limit=20&page=1`)
      const eventsReponse = data.data
      setEvents(eventsReponse)
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ShowsCarouselStyles>
      <h2 className="side-title">Upcoming Shows</h2>
      <div className="carousel">
        <Marquee pauseOnHover={true} speed={width < 1080 ? 50 : 50}>
          {events.map((event: any, index: number) => {
            return <EventCard key={"ShowItem" + index} eventData={event} />
          })}
        </Marquee>
      </div>
    </ShowsCarouselStyles>
  )
}

export default ShowsCarousel
