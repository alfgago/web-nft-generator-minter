import React from "react"
import { ReactSVG } from "react-svg"

import CheckBox from "@/components/Common/CheckBox"

import { DateItemStyles } from "./DateItemStyles"
const dateFormat = (value: any) => {
  const date = new Date(value)
  const day = date.toLocaleString("default", { day: "2-digit" })
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.toLocaleString("default", { year: "numeric" })
  return day + " " + month + " " + year
}

const DateItem = ({ show }: any) => {
  return (
    <DateItemStyles className="item">
      <div className="card-container">
        <div className="card-content">
          <div>
            <h4>{show.name}</h4>
            <CheckBox defaultState={true} />
          </div>
          <div className="address">{show.address}</div>
          <div className="date">{dateFormat(show.date)}</div>
        </div>
        <div className="btns-container" style={{ display: "none" }}>
          <button className="cancel-btn">
            <ReactSVG src="/assets/icons/close-white.svg" />
            Cancel date
          </button>
          <button className="confirm-btn">
            <ReactSVG src="/assets/icons/confirm.svg" />
            Confirm date
          </button>
        </div>
      </div>
    </DateItemStyles>
  )
}

export default DateItem
