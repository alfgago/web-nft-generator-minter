import Link from "next/link"

import { CommonPill } from "../CommonStyles"

import { LotteryRowStyles } from "./LotteryRowStyles"

const LotteryRow = ({ nft, color }: any) => {
  return (
    <LotteryRowStyles className={color}>
      <div className="image">
        <img
          src={nft.attributes?.art?.data[0]?.attributes?.url}
          alt="dropPic"
        />
      </div>
      <div className="inner-content">
        <div className="date">Feb. 9th 2023</div>
        <div className="name">{nft.attributes.name}</div>
        <div className="place">Warfield, San Fran, CA</div>
        <div className="winner">
          <small>Winner:</small>
          <span>{nft.attributes.winner_wallet}</span>
        </div>
        <div className="actions">
          <Link href="/" as="a">
            <CommonPill className="clickable small">Make Offer</CommonPill>
          </Link>
        </div>
      </div>
    </LotteryRowStyles>
  )
}

export default LotteryRow
