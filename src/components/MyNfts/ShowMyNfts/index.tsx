import React from "react"

import ItemPagination from "@/components/Common/ItemPagination"

import MyNftCard from "../MyNftCard"

import { ShowMyNftStyles } from "./ShowMyNftStyles"

const items = [
  {
    id: "Bull-1",
    name: "Bull Island",
    info: "Illander bull",
    price: 500,
    amount: 10,
    image: "/assets/img/myNft.jpg",
  },
  {
    id: "bull-2",
    name: "Green Island bull",
    info: "The Green Island bull",
    price: 200,
    amount: 100,
    image: "/assets/img/myNftBlue.jpg",
  },
  {
    id: "bull-3",
    name: "Dragon Bull",
    info: "The dragon concert",
    price: 700,
    amount: 35,
    image: "/assets/img/myNft.jpg",
  },
  {
    id: "bull-4",
    name: "Ocean Concer",
    info: "Concert in the Ocean",
    price: 1500,
    amount: 250,
    image: "/assets/img/myNftBlue.jpg",
  },
  {
    id: "bull-5",
    name: "Sun Concert",
    info: "The sunset concert",
    price: 50,
    amount: 90,
    image: "/assets/img/myNft.jpg",
  },
  {
    id: "bull-6",
    name: "Blue Sky",
    info: "The blue sky concert",
    price: 50,
    amount: 90,
    image: "/assets/img/myNftBlue.jpg",
  },
]

const ShowMyNfts = () => {
  return (
    <ShowMyNftStyles>
      <ItemPagination
        itemsPerPage={3}
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
