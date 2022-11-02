import React from "react"
import { DateItemStyles } from "./DateItemStyles"

const DateItem = ({ placeName, state, city, date }: any) => {
  return (
    <DateItemStyles>
      <div className="card-container">
        <div>
          <input type="checkbox" id="#" name="" value=""></input>
          <p>{placeName}</p>
          <p>
            {state}, {city}
          </p>
          <p>{date}</p>
        </div>
        <div className="btns-container">
          <a>Cancel date</a>
          <a href="">Confirm date</a>
        </div>
      </div>
    </DateItemStyles>
  )
}

export default DateItem
