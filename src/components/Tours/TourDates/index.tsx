import React from "react"
import { ReactSVG } from "react-svg"

import AddButton from "@/components/Common/AddButton"

import DateItem from "./DateItem"
import { TourDateStyles } from "./TourDateStyles"
const TourDates = ({ tourDates }: any) => {
  return (
    <>
      <TourDateStyles>
        <div className="date-settings">
          <a>
            <ReactSVG src="/assets/vectors/settings-icon.svg" />
          </a>
          <p>Verify tour dates</p>
          <div>
            <AddButton label="New date" />
          </div>
        </div>
        <div className="tour-dates">
          {tourDates.map((items: any) => {
            return (
              <DateItem
                key={items.id}
                placeName={items.placeName}
                state={items.state}
                city={items.city}
                date={items.date}
              />
            )
          })}
        </div>
      </TourDateStyles>
    </>
  )
}

export default TourDates
