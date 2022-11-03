import React from "react"
import { NftCollectionStyles } from "./NftCollectionStyles"
import AddButton from "@/components/Common/AddButton"
import CollectionItem from "./CollectionItem"
import ItemPagination from "@/components/Common/ItemPagination"

const NftCollections = () => {
  let nftCollections = [
    {
      id: 1,
      image: "images1",
      artistName: "artistName1",
      passType: "Lottery1",
      extraInfo: "extra info",
    },
    {
      id: 2,
      image: "images2",
      artistName: "artistName2",
      passType: "Lottery2",
      extraInfo: "extra info",
    },
    {
      id: 4,
      image: "images3",
      artistName: "artistName3",
      passType: "Lottery3",
      extraInfo: "extra info",
    },
    {
      id: 5,
      image: "images4",
      artistName: "artistName4",
      passType: "Lottery4",
      extraInfo: "extra info",
    },
    {
      id: 6,
      image: "images5",
      artistName: "artistName5",
      passType: "Lottery5",
      extraInfo: "extra info",
    },
  ]

  let values = JSON.stringify(nftCollections)
  return (
    <NftCollectionStyles>
      <div>
        <div className="header-collection">
          <h1>Approved NFT Collections</h1>
          <AddButton label="Mint new collection"></AddButton>
        </div>
        <ItemPagination itemsPerPage={3} values={nftCollections}>
          <CollectionItem />
        </ItemPagination>
      </div>
    </NftCollectionStyles>
  )
}

export default NftCollections
