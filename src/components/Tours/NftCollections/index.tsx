import React from "react"
import { NftCollectionStyles } from "./NftCollectionStyles"
import AddButton from "@/components/Common/AddButton"
import CollectionItem from "./CollectionItem"
const NftCollections = () => {
  return (
    <NftCollectionStyles>
      <div>
        <div className="header-collection">
          <h1>Approved NFT Collections</h1>
          <AddButton label="Mint new collection"></AddButton>
        </div>
        <CollectionItem />
      </div>
    </NftCollectionStyles>
  )
}

export default NftCollections
