import React from "react"

import MyNftCard from "../MyNftCard"

import { ShowMyNftStyles } from "./ShowMyNftStyles"

const ShowMyNfts = ({ items }: any) => {
  return (
    <ShowMyNftStyles className="my-nfts">
      <div className="content">
        <div className="list">
          {items.map((nft: any, index: number) => {
            return <MyNftCard key={"nft-" + index} nft={nft} />
          })}
        </div>
      </div>
    </ShowMyNftStyles>
  )
}

export default ShowMyNfts
