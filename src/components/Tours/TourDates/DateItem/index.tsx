import React from "react"
import { ReactSVG } from "react-svg"

import { DateItemStyles } from "./DateItemStyles"

const DateItem = ({ placeName, state, city, date }: any) => {
  return (
    <DateItemStyles>
      <div className="card-container">
        <div className="card-content">
          <input type="checkbox" id="#" name="" value="" />
          <p>{placeName}</p>
          <p>
            {state}, {city}
          </p>
          <p>{date}</p>
        </div>
        <div className="btns-container">
          <button className="cancel-btn">
            <ReactSVG src="/assets/vectors/close-white.svg" />
            Cancel date
          </button>
          <button className="confirm-btn">
            <ReactSVG src="/assets/vectors/confirm.svg" />
            Confirm date
          </button>
        </div>
      </div>
    </DateItemStyles>
  )
}

export default DateItem
