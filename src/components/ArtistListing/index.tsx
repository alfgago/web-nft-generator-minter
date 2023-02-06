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
  const uniqueCat: { name: string }[] = [{ name: "All" }]
  const [filters, setFilters] = useState(uniqueCat)

  // Fetch the data in the useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/artists?limit=200&sort=name")
        const artists = data.data
        setArtists(artists)

        const filterList = artists.filter((element: any) => {
          // validate if the filter exist
          const isDuplicated = uniqueCat.some((el) => {
            // console.log(el.name)
            if (el.name === element.attributes.genre) {
              return true
            }
            return false
          })

          if (!isDuplicated) {
            uniqueCat.push({ name: element.attributes.genre })
            setFilters(uniqueCat)
          }
        })
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

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
                      <CommonPill className="clickable small active">
                        {item.name}
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
        </div>
      </ListingStyles>
    </ArtistListingStyles>
  )
}

export default ArtistListing
