import React from "react"
import { ReactSVG } from "react-svg"

import { DateItemStyles } from "../../DateItem/DateItemStyles"

const DateItem = ({ placeName, state, city, date }: any) => {
  return (
    <DateItemStyles>
      <div className="card-container">
        <div className="card-content">
          <div>
            <p>{placeName}</p>
            <input type="checkbox" id="#" name="" value="" />
          </div>
          <p>
            {state}, {city}
          </p>
          <p>{date}</p>
        </div>
        <div className="btns-container">
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
