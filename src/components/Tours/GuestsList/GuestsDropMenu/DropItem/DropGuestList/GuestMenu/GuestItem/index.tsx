import React from "react"

import { GuestItemStyles } from "./GuestItemStyles"
const GuestItem = ({ data }: any) => {
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
      <div>
        <label>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={() => {
              console.log("click")
            }}
            id="subscribe"
            name="subscribe"
          />
        </label>
      </div>
    </GuestItemStyles>
  )
}

export default GuestItem
