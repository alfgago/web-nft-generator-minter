import React from "react"

import { MyNftGuestsItemStyles } from "./MyNftGuestsItemStyles"

const MyNftGuestsItem = ({ guestData }: any) => {
  console.log(guestData)
  return (
    <MyNftGuestsItemStyles>
      <div className="event-info-cont">
        <div>
          <img src={guestData.image} alt="" />
        </div>
        <div className="location-info-cont">
          <p>{guestData.venue},</p>
          <p>
            {guestData.city}, {guestData.state},
          </p>
          <p>{guestData.date}</p>
        </div>
      </div>
      <div>
        <p>info</p>
        form
      </div>
    </MyNftGuestsItemStyles>
  )
}

export default MyNftGuestsItem
