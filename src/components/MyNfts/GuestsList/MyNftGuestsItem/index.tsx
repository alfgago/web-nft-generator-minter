import React, { useEffect, useState } from "react"
import axios from "axios"

import NewGuestForm from "@/components/Tours/NewGuestForm"
import dateFormat from "@/utils/dateFunctions"

import { MyNftGuestsItemStyles } from "./MyNftGuestsItemStyles"

const MyNftGuestsItem = ({ nft }: any) => {
  const [event, setEvent] = useState<any>(false)
  const [queriedNft, setQueriedNft] = useState(false)
  // Fetch the data in the useEffect hook
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("SHOW")
        console.log(nft.event)
        const response = await axios.get(
          "/api/shows/single?id=" + nft.event.value
        )
        setEvent(response.data.data)
        const nftResponse = await axios.get(
          "/api/nfts/by-image-url?image=" +
            nft.image.replace("https://plusonemusic.io/ipfs/", "")
        )
        setQueriedNft(nftResponse.data)
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  if (!event) {
    return
  }
  return (
    <MyNftGuestsItemStyles>
      <div className="event-info-cont">
        <img src={nft.image} alt="" />
        <div className="innerinfo">
          <div className="name">{event?.attributes?.name}</div>
          <div className="address">
            {event?.attributes?.city}, {event?.attributes?.country}
          </div>
          <div className="date">{dateFormat(event?.attributes?.date)}</div>
        </div>
      </div>
      <div className="form-cont">
        {event && <NewGuestForm event={event} nft={queriedNft} />}
      </div>
    </MyNftGuestsItemStyles>
  )
}

export default MyNftGuestsItem
