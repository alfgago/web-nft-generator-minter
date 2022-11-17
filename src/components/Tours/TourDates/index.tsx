import React, { useState } from "react"
import { ReactSVG } from "react-svg"

import AddButton from "@/components/Common/AddButton"
import LoginModal from "@/components/Login/LoginModal"
import DateItem from "@/components/Tours/DateItem"

import { TourDateStyles } from "./TourDateStyles"
const TourDates = ({ tourDates }: any) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <TourDateStyles>
        <div className="date-settings">
          <a>
            <ReactSVG src="/assets/vectors/settings-icon.svg" />
          </a>
          <p>Verify tour dates</p>
          <div>
            <AddButton label="New date" action={() => setOpen(!isOpen)} />
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
        {isOpen && (
          <LoginModal setIsOpen={setOpen} title="Add new date">
            <div>hello</div>
          </LoginModal>
        )}
      </TourDateStyles>
    </>
  )
}

export default TourDates
