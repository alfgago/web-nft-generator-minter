import React from "react"
import { useState } from "react"
import { ReactSVG } from "react-svg"

import cleanUrl from "@/utils/cleanUrl"

import { GuestItemStyles } from "./GuestItemStyles"
const GuestItem = ({ data }: any) => {
  const [check, setIsChecked] = useState(true)

  const handleChange = () => {
    setIsChecked(!check)
  }

  const guestName: string = data.name
  const guestEmail: string = data.email
  const image = data.nft.data.attributes.image_url
  const nftName = data.nft.data.attributes.name

  return (
    <GuestItemStyles>
      <div>
        <img alt="user logo" src={cleanUrl(image)} />
      </div>
      <div className="container">
        <div className="black-header">
          <p>{nftName}</p>
        </div>
        <div>
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
