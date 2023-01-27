import { useEffect, useState } from "react"
import axios from "axios"

import { CommonPill } from "@/components/Common/CommonStyles"

import SimpleHeader from "../Common/SimpleHeader"

import PassCard from "./PassCard"
import {
  BrowseStyles,
  ListingStyles,
  PassListingStyles,
} from "./PassListingStyles"

const PassListing = () => {
  const [passes, setPasses] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const filters = ["All", "Tour", "Single", "Lottery", "Lifetime"]

  // Fetch the data in the useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/passes?limit=200&sort=drop_date&type=${activeFilter}`
        )
        const passes = data.data
        setPasses(passes)
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [activeFilter])

  return (
    <PassListingStyles>
      <SimpleHeader title="Pass Collections" textAlign="left" />
      <BrowseStyles>
        <section className="top-triangle">
          <div className="content">
            <div className="triangle-container">
              <span className="img-span">
                <img src="/assets/img/top-triangle-solo.png" alt="border-top" />
              </span>
            </div>
          </div>
        </section>
        <section className="filter-section">
          <div className="abs">
            <div className="content">
              <span className="title trap">Filter by pass type:</span>
              <ul className="filters">
                {filters.map((item: any, index: number) => {
                  return (
                    <li key={"filter-" + index}>
                      <CommonPill
                        className={`clickable small ${
                          item == activeFilter ? "active" : ""
                        }`}
                        onClick={() => setActiveFilter(item)}
                      >
                        {item}
                      </CommonPill>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </section>
      </BrowseStyles>
      <ListingStyles>
        <div className="content">
          <div className="list">
            {passes.map((item: any, index: number) => {
              return <PassCard key={"lottery-row" + index} pass={item} />
            })}
          </div>
        </div>
      </ListingStyles>
    </PassListingStyles>
  )
}

export default PassListing
