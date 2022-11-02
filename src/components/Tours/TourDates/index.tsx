import React from "react"
import { ReactSVG } from "react-svg"
import DateItem from "./DateItem"
import { TourDateStyles } from "./TourDateStyles"

const TourDates = () => {
  const tourDates = [
    {
      placeName: "National Stadium",
      state: "California",
      city: "San Francisco",
      date: `2015/23/22`,
    },
    {
      placeName: "National Stadium",
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
            <button>
              <ReactSVG src="/assets/vectors/add-icon.svg" />
              <span>New date</span>
            </button>
          </div>
        </div>

        {tourDates.map((items) => {
          return (
            <DateItem
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
