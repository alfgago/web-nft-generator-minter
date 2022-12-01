import React from "react"

import { CommonPill } from "@/components/Common/CommonStyles"

import { MyNftCardStyles } from "./MyNftCardStyles"

const MyNftCard = ({ nftData }: any) => {
  console.log(nftData)

  return (
    <MyNftCardStyles>
      <div className="head-cont">
        <p>{nftData.name}</p>
        <p>{nftData.info}</p>
      </div>
      <div className="content-cont">
        <div>
          <img src="/assets/img/myNft.jpg" alt="" />
        </div>
        <div className="info-cont">
          <div>
            <p>Price: {nftData.price}</p>
            <p>Amount: {nftData.amount}</p>
          </div>
          <a>
            <CommonPill className="btn clickable black small">Sell</CommonPill>
          </a>
        </div>
      </div>
    </MyNftCardStyles>
  )
}

export default MyNftCard
