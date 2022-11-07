import React from "react"
import { ReactSVG } from "react-svg"
import DateItem from "./DateItem"
import { TourDateStyles } from "./TourDateStyles"
import AddButton from "@/components/Common/AddButton"
const TourDates = () => {
  const tourDates = [
    {
      id: 111,
      placeName: "National Stadium",
      state: "California",
      city: "San Francisco",
      date: `2015/23/22`,
    },
    {
      id: 112,
      placeName: "Inter National Stadium",
      state: "California",
      city: "San Francisco",
      date: `2015/23/22`,
    },
    {
      id: 132,
      placeName: "Inter National Stadium",
      state: "California",
      city: "San Francisco",
      date: `2015/23/22`,
    },
  ]

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

        {tourDates.map((items) => {
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
