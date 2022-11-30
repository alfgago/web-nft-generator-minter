import React, { useEffect, useState } from "react"
import { getSession, useSession } from "next-auth/react"
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
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"

  const [tourData, setTourData] = useState<AxiosResponse | null | void>(null)
  const { data: session } = useSession()

  // need to be solved, the session on first load is undefined
  useEffect(() => {
    if (session) {
      fetchData(session)
    }
  }, [session])

  const fetchData = async (session: any) => {
    const response = await axios.get(`${apiURL}api/users/me?populate=artists`, {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    })

    setTourData(response.data)
    // console.log(tourData)
  }

  const [tourDates, setTourDates] = useState(datesList)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    let filteredList = datesList
    if (filter) {
      filteredList = datesList.filter((el) => el.origin == filter)
    }
    setTourDates(filteredList)
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

// export async function getServerSideProps(ctx: any) {
//   const data = await getSession(ctx)
//   console.log(data)
//   return {
//     props: {
//       sessionData: await getSession(ctx),
//     },
//   }
// }

export default TourFilters
