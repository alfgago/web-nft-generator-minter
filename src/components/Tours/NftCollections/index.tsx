import React from "react"

import AddButton from "@/components/Common/AddButton"
import ItemPagination from "@/components/Common/ItemPagination"

import CollectionItem from "./CollectionItem"
import { NftCollectionStyles } from "./NftCollectionStyles"

const NftCollections = () => {
  const nftCollections = [
    {
      id: 1,
      artistName: "artistName1",
      passType: "Lottery1",
      amount: 22,
      extraInfo: "extra info",
      eventName: "eventName1",
      image: "/assets/img/collectionPic.png",
    },
    {
      id: 2,
      artistName: "artistName2",
      passType: "Lottery2",
      amount: 22,
      extraInfo: "extra info",
      eventName: "eventName1",
      image: "/assets/img/collectionPic.png",
    },
    {
      id: 4,
      artistName: "artistName3",
      passType: "Lottery3",
      amount: 22,
      extraInfo: "extra info",
      eventName: "eventName1",
      image: "/assets/img/collectionPic.png",
    },
    {
      id: 5,
      artistName: "artistName4",
      passType: "Lottery4",
      extraInfo: "extra info",
      amount: 22,
      eventName: "eventName1",
      image: "/assets/img/collectionPic.png",
    },
    {
      id: 6,
      artistName: "artistName5",
      passType: "Lottery5",
      extraInfo: "extra info",
      amount: 22,
      eventName: "eventName1",
      image: "/assets/img/collectionPic.png",
    },
  ]

  return (
    <NftCollectionStyles>
      <div className="content">
        <div className="header-collection">
          <h1>Approved NFT Collections</h1>
          <AddButton label="Mint new collection" />
        </div>
        <ItemPagination itemsPerPage={3} values={nftCollections}>
          <CollectionItem />
        </ItemPagination>
      </div>
    </NftCollectionStyles>
  )
}

export default NftCollections
