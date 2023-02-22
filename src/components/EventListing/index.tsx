import React, { useEffect, useState } from "react"
import axios from "axios"

import { CommonPill } from "../Common/CommonStyles"
import SimpleHeader from "../Common/SimpleHeader"

import EventCard from "./EventCard"
import { EventListingStyles, ListingStyles } from "./EventListingStyles"

const EventListing = () => {
  const [events, setEvents] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = async (prevEvents = [], nextpage = 1) => {
    try {
      setIsLoading(true)
      setCurrentPage(nextpage)
      const { data } = await axios.get(`/api/shows?limit=10&page=${nextpage}`)
      const eventsReponse = data.data
      setEvents(prevEvents.concat(eventsReponse))
      setPageCount(data.meta.pagination.pageCount)
      setIsLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    fetchData([], 1)
  }, [])

  const loadMore = () => {
    const nextPage = currentPage + 1
    fetchData(events, nextPage)
  }

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
          {currentPage < pageCount ? (
            <div className="loadmore">
              <span onClick={() => loadMore()}>
                <CommonPill className="clickable small">Load More</CommonPill>
              </span>
            </div>
          ) : (
            ""
          )}
          {isLoading && (
            <div className="loading">
              <img
                src="/assets/img/spinner.svg"
                className="spinner"
                alt="loader"
              />
            </div>
          )}
        </div>
      </ListingStyles>
    </EventListingStyles>
  )
}

export default EventListing
