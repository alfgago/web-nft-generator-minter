import React from "react"

import NewGuestForm from "@/components/Tours/NewGuestForm"

import { MyNftGuestsItemStyles } from "./MyNftGuestsItemStyles"

const MyNftGuestsItem = ({ guestData }: any) => {
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
      <div className="form-cont">
        <p>Info</p>
        <NewGuestForm />
      </div>
    </MyNftGuestsItemStyles>
  )
}

export default MyNftGuestsItem
