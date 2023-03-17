import React, { useEffect, useState } from "react"
import { isMapIterator } from "util/types"

import NewGuestForm from "@/components/Tours/NewGuestForm"

import { MyNftGuestsItemStyles } from "./MyNftGuestsItemStyles"

const MyNftGuestsItem = ({ guestData, guestNfts }: any) => {
  const image =
    guestData.attributes.artist.data.attributes.profile_picture.data.attributes
      .url
  const location = guestData.attributes.address
  const currentEvent = guestData.id
  const spreadedString = location.split(",")
  const date = guestData.attributes.date
  const month = new Date(date).toLocaleString("default", {
    month: "long",
  })
  const day = new Date(date).toLocaleString("default", {
    day: "2-digit",
  })
  const nftData: any[] = []
  const [nftList, setNftList] = useState<any>([])

  useEffect(() => {
    const nft = guestData.attributes.passes.data.map((passes: any) => {
      passes.attributes.nfts.data.map((nfts: any) => {
        const img = nfts.attributes.image_url
        if (guestNfts.includes(img)) {
          nftData.push(nfts)
          setNftList(nftData)
        }
      })
    })
  }, [])
  // setNftList(nftData)

  return (
    <MyNftGuestsItemStyles>
      <div className="event-info-cont">
        <div>
          <img src={image} alt="" />
        </div>
      </div>
      <div className="form-cont">
        <p>Info</p>

        <NewGuestForm event={currentEvent} nftData={nftList} />
      </div>
    </MyNftGuestsItemStyles>
  )
}

export default MyNftGuestsItem
