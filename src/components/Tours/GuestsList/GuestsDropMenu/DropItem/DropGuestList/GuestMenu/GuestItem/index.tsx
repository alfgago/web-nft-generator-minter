import React from "react"
import { useState } from "react"
import { ReactSVG } from "react-svg"

import { GuestItemStyles } from "./GuestItemStyles"
const GuestItem = ({ data }: any) => {
  const [check, setIsChecked] = useState(true)

  const handleChange = () => {
    setIsChecked(!check)
  }
  return (
    <GuestItemStyles>
      <div>
        <img alt="user logo" src={data.image} />
      </div>
      <div className="container">
        <div className="black-header">
          <p>NFT #Tour Pass #1</p>
        </div>
        <div>
          <p>{data.name}</p>
        </div>
        <div>
          <p>{data.email}</p>
        </div>
      </div>
      <span>
        <input
          type="checkbox"
          defaultChecked={true}
          onChange={handleChange}
          id="subscribe"
          name="subscribe"
        />
        {/* <ReactSVG src="/assets/vectors/grey-check.svg" /> */}
      </span>
    </GuestItemStyles>
  )
}

export default GuestItem
