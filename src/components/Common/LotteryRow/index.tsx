import Image from "next/image"
import Link from "next/link"

import cleanUrl from "@/utils/cleanUrl"

import { CommonPill } from "../CommonStyles"

import { LotteryRowStyles } from "./LotteryRowStyles"

const LotteryRow = ({ nft, color }: any) => {
  const imageUrl = nft.attributes?.image_url
  const imageW = 150
  const imageH = 150

  return (
    <LotteryRowStyles className={color}>
      <div className="image">
        <Image
          src={cleanUrl(imageUrl)}
          alt={nft.attributes.name}
          quality={90}
          width={imageW}
          height={imageH}
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
          <Link legacyBehavior href="/">
            <CommonPill className="clickable small">Make Offer</CommonPill>
          </Link>
        </div>
      </div>
    </LotteryRowStyles>
  )
}

export default LotteryRow
