import React, { useState } from "react"
import { ReactSVG } from "react-svg"

import AddButton from "@/components/Common/AddButton"
import ItemPagination from "@/components/Common/ItemPagination"
import Modal from "@/components/Common/Modal"

import NewCollectionForm from "../NewCollectionForm"

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

  const [isOpen, setIsOpen] = useState(false)

  return (
    <NftCollectionStyles>
      <ReactSVG className="star" src="/assets/vectors/star.svg" />
      <div className="content">
        <div className="header-collection">
          <h2>Approved NFT Collections</h2>
          <AddButton
            label="Mint new collection"
            action={() => setIsOpen(!isOpen)}
          />
        </div>
        <div className="sec-tittles">
          <div>
            <p>Collection info</p>
          </div>
          <div className="sec-info">
            <p>Guest list type</p>
            <p>Tour / event</p>
            <p className="p-3">
              Winners per event
              <span> (Lottery only, 1 winner = 2 spots on the guest list)</span>
            </p>
          </div>
        </div>
        <ItemPagination
          itemsPerPage={3}
          values={nftCollections}
          render={(items: any) => {
            return (
              <div>
                {items.map((data: any, i: number) => (
                  <CollectionItem key={data.id} item={data} />
                ))}
              </div>
            )
          }}
        />
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} title="Mint new collection">
          <NewCollectionForm />
        </Modal>
      )}
    </NftCollectionStyles>
  )
}

export default NftCollections
