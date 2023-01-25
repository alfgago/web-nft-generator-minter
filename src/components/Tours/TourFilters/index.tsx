/* eslint-disable guard-for-in */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"

import TourDates from "../TourDates"

import { TourFilterStyles } from "./TourFilterStyles"

function TourFilters() {
  const [tourDates, setTourDates] = useState([])
  const [filter, setFilter] = useState("")
  const { data: user } = useSession()

  const fetchData = async () => {
    // @ts-ignore
    const res = await axios.get("/api/shows?user=" + user.id)
    const artistShows = res.data.data
    setTourDates(artistShows)
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
