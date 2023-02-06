import { useEffect, useState } from "react"
import axios from "axios"

import { CommonPill } from "@/components/Common/CommonStyles"
import SimpleHeader from "@/components/Common/SimpleHeader"

import ArtistCard from "../Common/ArtistCard"

import {
  ArtistListingStyles,
  BrowseStyles,
  ListingStyles,
} from "./ArtistListingStyles"

const ArtistListing = () => {
  const [artists, setArtists] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pageCount, setPageCount] = useState(1)
  const filters = ["All", "Pop", "Rock", "Hip Hop", "EDM", "Latin"]

  const fetchData = async (prevArtists = [], nextPage = 1) => {
    try {
      setLoading(true)
      setPage(nextPage)
      const { data } = await axios.get(
        `/api/artists?limit=10&sort=name&genre=${activeFilter}&page=${nextPage}`
      )
      const nextArtists = data.data
      setArtists(prevArtists.concat(nextArtists))
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
    fetchData(artists, nextPage)
  }

  return (
    <ArtistListingStyles>
      <SimpleHeader title="Artists" textAlign="left" />
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
              <span className="title trap">Filter by genre:</span>
              <ul className="filters">
                {filters.map((item: any, index: number) => {
                  return (
                    <li key={"filter-artist" + index}>
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
            {artists.map((item: any, index: number) => {
              return <ArtistCard key={"artist" + index} artist={item} />
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
    </ArtistListingStyles>
  )
}

export default ArtistListing
