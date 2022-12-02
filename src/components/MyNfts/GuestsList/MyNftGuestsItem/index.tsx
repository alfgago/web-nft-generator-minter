import React from "react"

import { MyNftGuestsItemStyles } from "./MyNftGuestsItemStyles"

const MyNftGuestsItem = ({ guestData }: any) => {
  return (
    <MyNftGuestsItemStyles>
      <div className="event-info-cont">
        <div>img</div>
        <div>
          <p>venue,</p>
          <p>city, state</p>
          <p>date</p>
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
