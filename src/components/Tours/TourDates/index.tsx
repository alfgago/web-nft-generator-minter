import React, { useState } from "react"
import { ReactSVG } from "react-svg"

import AddButton from "@/components/Common/AddButton"
import LoginModal from "@/components/Common/Modal"
import DateItem from "@/components/Tours/DateItem"

import NewDateForm from "../NewDateForm"

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
          <LoginModal setIsOpen={setOpen} title="New tour date">
            <NewDateForm />
          </LoginModal>
        )}
      </TourDateStyles>
    </>
  )
}

export default TourDates
