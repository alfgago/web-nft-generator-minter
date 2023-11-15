import React from "react"

import { CommonPill } from "@/components/Common/CommonStyles"
import cleanUrl from "@/utils/cleanUrl"

import { MyNftCardStyles } from "./MyNftCardStyles"

const MyNftCard = ({ nft }: any) => {
  return (
    <MyNftCardStyles className="nft-card">
      <div className="head-cont">
        <h3>{nft.title}</h3>
      </div>
      <div className="content-cont">
        <div>
          <img src={cleanUrl(nft.media[0].gateway)} alt="" />
        </div>
        <div className="info-cont">
          <a
            title={"Sell " + nft.title + " on Marketplace"}
            href="https://market.plusonemusic.io/"
          >
            <CommonPill className="clickable small">Sell</CommonPill>
          </a>
        </div>
      </div>
    </MyNftCardStyles>
  )
}

export default MyNftCard
