import React, { useState } from "react"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"
import Modal from "@/components/Common/Modal"
import DateItem from "@/components/Tours/DateItem"

import NewDateForm from "../NewDateForm"

import { TourDateStyles } from "./TourDateStyles"
const TourDates = ({ tourDates }: any) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <TourDateStyles>
        <div className="date-settings">
          <a className="cog">
            <ReactSVG src="/assets/icons/settings-icon.svg" />
          </a>
          <h2>Verify upcoming shows</h2>
          <div>
            <CommonPill
              className="clickable fill pink"
              onClick={() => setOpen(!isOpen)}
            >
              <ReactSVG
                src="/assets/icons/add-icon.svg"
                wrapper="span"
                className="icon"
              />
              <span>New date</span>
            </CommonPill>
          </div>
        </div>
        <div className="tour-dates">
          {tourDates.map((item: any) => {
            if (item) {
              return <DateItem key={item.id} show={item.attributes} />
            }
          })}
        </div>
        {isOpen && (
          <Modal setIsOpen={setOpen} title="New tour date">
            <NewDateForm />
          </Modal>
        )}
      </TourDateStyles>
    </>
  )
}

export default TourDates
