import { useEffect, useState } from "react"
import axios from "axios"

import { ListingStyles } from "@/components/ArtistListing/ArtistListingStyles"
import ArtistCard from "@/components/Common/ArtistCard"

import { SuggestedArtistsStyles } from "./SuggestedArtistsStyles"

const SuggestedArtists = ({ title }: any) => {
  const [artists, setArtists] = useState([])

  async function fetchData() {
    try {
      const { data } = await axios.get("/api/artists")
      const artists = data.data
      setArtists(artists)
    } catch (err: any) {
      console.log(err)
    }
  }

  // Fetch the data in the useEffect hook
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SuggestedArtistsStyles>
      <div className="content">
        <h2 className="title">{title}</h2>
      </div>

      <ListingStyles>
        <div className="content">
          <div className="list">
            {artists.map((item: any, index: number) => {
              return <ArtistCard key={"artist" + index} artist={item} />
            })}
          </div>
        </div>
      </ListingStyles>
    </SuggestedArtistsStyles>
  )
}

export default SuggestedArtists
