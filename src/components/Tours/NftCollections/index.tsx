import React from "react"
import { NftCollectionStyles } from "./NftCollectionStyles"
import AddButton from "@/components/Common/AddButton"
import CollectionItem from "./CollectionItem"
import ItemPagination from "@/components/Common/ItemPagination"

const NftCollections = () => {
  let nftCollections = [
    { id: 1, image: "images1", content: "content1" },
    { id: 2, image: "images2", content: "content2" },
    { id: 4, image: "images3", content: "content3" },
    { id: 5, image: "images4", content: "content4" },
    { id: 6, image: "images5", content: "content5" },
    { id: 7, image: "images6", content: "content6" },
    { id: 7, image: "images7", content: "content7" },
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
