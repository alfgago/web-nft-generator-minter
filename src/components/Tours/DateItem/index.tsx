import React from "react"
import { ReactSVG } from "react-svg"

import CheckBox from "@/components/Common/CheckBox"
import cleanUrl from "@/utils/cleanUrl"

import { DateItemStyles } from "./DateItemStyles"
const dateFormat = (value: any) => {
  const date = new Date(value)
  const day = date.toLocaleString("default", { day: "2-digit" })
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.toLocaleString("default", { year: "numeric" })
  return day + " " + month + " " + year
}

const DateItem = ({ show }: any) => {
  const imageUrl =
    show?.image?.data?.attributes?.formats?.thumbnail?.url ??
    "/assets/img/p1-small-vertical.jpg"
  return (
    <DateItemStyles className="item">
      <div className="card-container">
        <img src={cleanUrl(imageUrl)} alt="event image" />
        <div className="card-content">
          <div>
            <h4>{show.name}</h4>
          </div>
          {show.city && show.country && (
            <div className="address">
              {show.city}, {show.country}
            </div>
          )}
          <div className="date">{dateFormat(show.date)}</div>
        </div>
      </div>
    </DateItemStyles>
  )
}

export default DateItem
