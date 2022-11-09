import React from "react"
import { ReactSVG } from "react-svg"

import AddButton from "@/components/Common/AddButton"

import DateItem from "./DateItem"
import { TourDateStyles } from "./TourDateStyles"
const TourDates = ({ tourDates }: any) => {
  console.log(tourDates)

  return (
    <>
      <TourDateStyles>
        <div className="date-settings">
          <div>
            <span>Verify tour dates</span>
            <a>
              <ReactSVG src="/assets/vectors/settings-icon.svg" />
            </a>
          </div>

          <div>
            <AddButton label="New date" />
          </div>
        </div>

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
      </TourDateStyles>
    </>
  )
}

export default TourDates
