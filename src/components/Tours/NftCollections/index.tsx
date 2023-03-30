/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import axios from "axios"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"

import CollectionItem from "./CollectionItem"
import { NftCollectionStyles } from "./NftCollectionStyles"

const NftCollections = () => {
  const [passes, setPasses] = useState([])
  const { data: user } = useSession()

  async function fetchData() {
    try {
      // @ts-ignore
      const { data } = await axios.get("/api/passes?user=" + user.id)
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
          <Link href="/pass-generator" className="button">
            <CommonPill className="clickable blue ">
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
              <small> (2 slots per winner)</small>
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
