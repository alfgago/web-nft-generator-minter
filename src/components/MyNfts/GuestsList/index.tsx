// @ts-nocheck
import React, { useEffect, useState } from "react"

import cleanUrl from "@/utils/cleanUrl"

import MyNftGuestsItem from "./MyNftGuestsItem"
import { MyNftGuestsListStyles } from "./MyNftGuestsListStyles"
import NodataGuests from "./NoDataGuests"

const MyNftGuestsList = ({ myNfts }: any) => {
  const [nfts, setNfts] = useState<number[]>([])
  const fetchData = async () => {
    const filteredArray = myNfts
      .map((item: any) => ({
        image: cleanUrl(item.metadata.image),
        event: item.metadata.attributes.find(
          (attr: any) => attr.trait_type === "event"
        ),
      }))
      .filter((item: any) => item.event !== undefined)
    setNfts(filteredArray)
  }

  useEffect(() => {
    fetchData()
  }, [myNfts])

  return (
    <MyNftGuestsListStyles>
      <div className="content">
        {nfts.length > 0 ? (
          <>
            <h2>Access Guest List</h2>
            <div className="items-cont">
              {nfts.map((nft: any, index: number) => {
                return <MyNftGuestsItem key={"listnft-" + index} nft={nft} />
              })}
            </div>
          </>
        ) : (
          <NodataGuests />
        )}
      </div>
    </MyNftGuestsListStyles>
  )
}

export default MyNftGuestsList
