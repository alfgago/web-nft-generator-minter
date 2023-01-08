/* eslint-disable guard-for-in */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios, { AxiosResponse } from "axios"

import TourDates from "../TourDates"

import { TourFilterStyles } from "./TourFilterStyles"

const datesList = [
  {
    id: 111,
    placeName: "National Stadium",
    state: "California",
    city: "San Francisco",
    date: `2015/23/22`,
    origin: `songkick`,
  },
  {
    id: 112,
    placeName: "Inter National Stadium",
    state: "California",
    city: "San Francisco",
    date: `2015/23/22`,
    origin: `bandsintown`,
  },
  {
    id: 132,
    placeName: "Inter National Stadium",
    state: "California",
    city: "San Francisco",
    date: `2015/23/22`,
    origin: `manual`,
  },
  {
    id: 1323,
    placeName: "Inter National Stadium",
    state: "California",
    city: "San Francisco",
    date: `2015/23/22`,
    origin: `manual`,
  },
  {
    id: 1326,
    placeName: "Inter National Stadium",
    state: "California",
    city: "San Francisco",
    date: `2015/23/22`,
    origin: `manual`,
  },
  {
    id: 1328,
    placeName: "Inter National Stadium",
    state: "California",
    city: "San Francisco",
    date: `2015/23/22`,
    origin: `manual`,
  },
]

function TourFilters() {
  const [tourDates, setTourDates] = useState([])
  const [filter, setFilter] = useState("")
  const { data: user } = useSession()

  const fetchData = async () => {
    // @ts-ignore
    const artistsResponse = await axios.get("/api/artists?user=" + 1)
    const artists = artistsResponse.data.data
    let shows: any = []
    for (const i in artists) {
      if (artists[i].attributes.events.data) {
        const artistShows = artists[i].attributes.events.data
        shows = shows.concat(artistShows)
      }
    }
    setTourDates(shows)
  }

  useEffect(() => {
    fetchData()
  }, [filter])

  return (
    <TourFilterStyles>
      <div className="content">
        <div>
          <ul className="filters">
            <li onClick={() => setFilter("")}>All</li>
            <li onClick={() => setFilter("bandsintown")}>Bandsintown</li>
            <li onClick={() => setFilter("songkick")}>SongKick</li>
            <li onClick={() => setFilter("manual")}>Manual</li>
          </ul>
          <TourDates tourDates={tourDates} />
        </div>
      </div>
    </TourFilterStyles>
  )
}

export default TourFilters
