import Image from "next/image"
import Link from "next/link"

import s3url from "@/utils/s3url"

import { CommonPill } from "../CommonStyles"

import { LotteryRowStyles } from "./LotteryRowStyles"

const LotteryRow = ({ nft, color }: any) => {
  const imageUrl = nft.attributes?.art?.data[0]?.attributes?.url
  const imageW = nft.attributes?.art?.data[0]?.attributes?.width
  const imageH = nft.attributes?.art?.data[0]?.attributes?.height

  return (
    <LotteryRowStyles className={color}>
      <div className="image">
        <Image
          src={s3url(imageUrl)}
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
          <Link legacyBehavior href="/" as="a">
            <CommonPill className="clickable small">Make Offer</CommonPill>
          </Link>
        </div>
      </div>
    </LotteryRowStyles>
  )
}

export default LotteryRow
