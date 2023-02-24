import React, { useEffect, useState } from "react"

import ItemPagination from "@/components/Common/ItemPagination"

import MyNftCard from "../MyNftCard"

import { ShowMyNftStyles } from "./ShowMyNftStyles"

const ShowMyNfts = ({ items }: any) => {
  // console.log("items")
  // console.log(items)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth)
      // do something every time the screen changes
      console.log("Screen size changed")
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <ShowMyNftStyles className="my-nfts">
      <div className="content">
        <div className="list">
          {items.length > 0 ? (
            <ItemPagination
              itemsPerPage={screenWidth > 1080 ? 3 : 2}
              values={items}
              render={(itemsVals: any) => {
                return (
                  <div className="items-cont">
                    {itemsVals.map((nft: any, index: number) => {
                      return <MyNftCard key={"nft-" + index} nft={nft} />
                    })}
                  </div>
                )
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </ShowMyNftStyles>
  )
}

export default ShowMyNfts
