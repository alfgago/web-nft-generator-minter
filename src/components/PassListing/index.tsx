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
  const filters = ["All", "Guest", "Circle", "Status", "Infinity"]
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pageCount, setPageCount] = useState(1)

  const fetchData = async (prevPasses = [], nextPage = 1) => {
    try {
      setLoading(true)
      setPage(nextPage)
      const { data } = await axios.get(
        `/api/passes?limit=10&sort=drop_date&type=${activeFilter}&page=${nextPage}`
      )
      const nextPasses = data.data
      setPasses(prevPasses.concat(nextPasses))
      setPageCount(data.meta.pagination.pageCount)
      setLoading(false)
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData([], 1)
  }, [activeFilter])

  const loadMore = () => {
    const nextPage = page + 1
    fetchData(passes, nextPage)
  }

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
          {page < pageCount ? (
            <div className="loadmore">
              <span onClick={() => loadMore()}>
                <CommonPill className="clickable small">Load More</CommonPill>
              </span>
            </div>
          ) : (
            ""
          )}

          {loading && (
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
    </PassListingStyles>
  )
}

export default PassListing
