import React from "react"

import NewGuestForm from "@/components/Tours/NewGuestForm"

import { MyNftGuestsItemStyles } from "./MyNftGuestsItemStyles"

const MyNftGuestsItem = ({ guestData }: any) => {
  const image =
    guestData.attributes.artist.data.attributes.profile_picture.data.attributes
      .url
  const location = guestData.attributes.address

  const spreadedString = location.split(",")
  const date = guestData.attributes.date
  const month = new Date(date).toLocaleString("default", {
    month: "long",
  })
  const day = new Date(date).toLocaleString("default", {
    day: "2-digit",
  })
  return (
    <MyNftGuestsItemStyles>
      <div className="event-info-cont">
        <div>
          <img src={image} alt="" />
        </div>
        <div className="location-info-cont">
          {spreadedString.map((data: any, index: number) => {
            return <p key={"location" + index}>{data + ","}</p>
          })}
          <p>{month + " " + day}</p>
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
