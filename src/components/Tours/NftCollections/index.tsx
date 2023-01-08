import React, { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"
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

  const [passes, setPasses] = useState([])

  async function fetchData() {
    try {
      const { data } = await axios.get("/api/passes?artist=2")
      const passes = data.data
      setPasses(passes)
    } catch (err: any) {
      console.log(err)
    }
  }

  // Fetch the data in the useEffect hook
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <NftCollectionStyles>
      <ReactSVG className="star" src="/assets/icons/star.svg" />
      <div className="content">
        <div className="header-collection">
          <h2>NFT Collections</h2>
          <Link href="/nft-generator" className="button">
            <CommonPill className="clickable blue small">
              <ReactSVG
                src="/assets/icons/add-icon.svg"
                wrapper="span"
                className="icon"
              />
              <span>Mint new pass collection</span>
            </CommonPill>
          </Link>
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
              <small>
                {" "}
                (Lottery only, 1 winner = 2 spots on the guest list)
              </small>
            </p>
          </div>
        </div>
        <div>
          {passes.map((data: any, i: number) => (
            <CollectionItem key={data.id} item={data.attributes} />
          ))}
        </div>
      </div>
    </NftCollectionStyles>
  )
}

export default NftCollections
