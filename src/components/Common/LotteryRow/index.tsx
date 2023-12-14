import Image from "next/image"
import Link from "next/link"

import cleanUrl, { getNftImageUrl } from "@/utils/cleanUrl"
import dateFormat from "@/utils/dateFunctions"

import { CommonPill } from "../CommonStyles"

import { LotteryRowStyles } from "./LotteryRowStyles"

const LotteryRow = ({ drop, color }: any) => {
  const nft = drop.attributes?.airdropped_nft?.data
  if (!nft) {
    return <></>
  }
  const winner = drop.attributes?.winner?.data
  const imageUrl = getNftImageUrl(nft)
  const imageW = 150
  const imageH = 150

  const event =
    nft?.attributes?.pass_collection?.data?.attributes?.event?.data?.attributes
  if (!event) {
    return <></>
  }
  const date = dateFormat(event?.date)
  const city = event?.city
  const country = event?.country

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
        <div className="date">{date}</div>
        <div className="name">{nft.attributes.name}</div>
        <div className="place">
          {city}, {country}
        </div>
        <div className="winner">
          <small>Winner:</small>
          <span>{winner.attributes?.wallet}</span>
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
