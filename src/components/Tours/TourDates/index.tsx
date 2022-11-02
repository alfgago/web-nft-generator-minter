import React from "react"
import { ReactSVG } from "react-svg"
import { TourDateStyles } from "./TourDateStyles"

const TourDates = () => {
  return (
    <>
      <TourDateStyles>
        <div className="date-settings">
          <p>Verify tour dates</p>
          <a>settings</a>
          <button>New date</button>
        </div>
      </TourDateStyles>
    </>
  )
}

export default TourDates
