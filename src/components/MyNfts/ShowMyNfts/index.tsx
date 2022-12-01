import React from "react"

import ItemPagination from "@/components/Common/ItemPagination"

import MyNftCard from "../MyNftCard"

import { ShowMyNftStyles } from "./ShowMyNftStyles"

const items = [
  { id: "holla", name: "nftData1", info: "nft info 1", price: 500, amount: 20 },
  {
    id: "holla2",
    name: "nftData2",
    info: "nft info 2",
    price: 500,
    amount: 20,
  },
]

const ShowMyNfts = () => {
  return (
    <ShowMyNftStyles>
      <ItemPagination
        itemsPerPage={2}
        values={items}
        render={(items: any) => {
          return (
            <div className="content">
              {items.map((data: any) => {
                return <MyNftCard key={data.id} nftData={data} />
              })}
            </div>
          )
        }}
      />
    </ShowMyNftStyles>
  )
}

export default ShowMyNfts
