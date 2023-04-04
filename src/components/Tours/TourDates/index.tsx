import React, { useState } from "react"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"
import Modal from "@/components/Common/Modal"
import DateItem from "@/components/Tours/DateItem"

import EditDateForm from "../ShowForm/Edit"
import NewDateForm from "../ShowForm/New"

import { TourDateStyles } from "./TourDateStyles"
const TourDates = ({ tourDates }: any) => {
  const [isAdding, setIsAdding] = useState(false)
  const [editShowId, setEditShowId] = useState(0)

  const onEdit = async (id: number) => {
    setEditShowId(id)
  }

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
              onClick={() => setIsAdding(!isAdding)}
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
              return (
                <DateItem
                  key={item.id}
                  show={item.attributes}
                  onEdit={() => onEdit(item.id)}
                />
              )
            }
          })}
        </div>
        {isAdding && (
          <Modal setIsOpen={setIsAdding} title="New tour date">
            <NewDateForm />
          </Modal>
        )}
        {editShowId && (
          <Modal setIsOpen={setEditShowId} title="Edit tour date">
            <EditDateForm editShowId={editShowId} />
          </Modal>
        )}
      </TourDateStyles>
    </>
  )
}

export default TourDates
