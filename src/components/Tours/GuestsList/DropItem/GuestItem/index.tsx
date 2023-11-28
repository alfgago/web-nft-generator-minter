import React from "react"
import { useState } from "react"

import P1Image from "@/components/Common/P1Image"
import { getNftImageUrl } from "@/utils/cleanUrl"

import { GuestItemStyles } from "./GuestItemStyles"
const GuestItem = ({ data }: any) => {
  const [check, setIsChecked] = useState(true)

  const handleChange = () => {
    setIsChecked(!check)
  }
  const guestName: string = data.name
  const guestEmail: string = data.email
  const image = getNftImageUrl(data.nft)
  const nftName = data.nft?.data?.attributes?.name || "NFT Deleted"

  return (
    <GuestItemStyles>
      <div>
        <P1Image alt="user logo" src={image} width={120} height={120} />
      </div>
      <div className="container">
        <div className="black-header">
          <p>{nftName}</p>
        </div>
        <div className="mid-cont">
          <p>{guestName}</p>
        </div>
        <div>
          <p>{guestEmail}</p>
        </div>
      </div>
      <span>
        <input
          type="checkbox"
          defaultChecked={true}
          onChange={handleChange}
          id=""
          name=""
        />
        {/* <ReactSVG src="/assets/icons/grey-check.svg" /> */}
      </span>
    </GuestItemStyles>
  )
}

export default GuestItem
