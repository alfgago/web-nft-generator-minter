import React, { useState } from "react"
import { ReactSVG } from "react-svg"

import AddButton from "@/components/Common/AddButton"
import Button from "@/components/Common/Button"
import { CommonPill } from "@/components/Common/CommonStyles"
import ItemPagination from "@/components/Common/ItemPagination"
import Modal from "@/components/Common/Modal"
import NewGuestForm from "@/components/Tours/NewGuestForm"

import GuestItem from "../GuestItem"

import { DropGuestListStyles } from "./DropGuestListStyles"

const DropGuestList = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropGuestListStyles>
      <ItemPagination
        itemsPerPage={3}
        values={data}
        render={(items: any) => {
          return (
            <>
              {items.map((data: any, i: number) => (
                <GuestItem key={"guestItem" + i} data={data} />
              ))}
            </>
          )
        }}
      />
      <div className="btns-container">
        <CommonPill
          className="clickable small"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Export guest list</span>
        </CommonPill>
        <CommonPill
          className="clickable fill small black"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ReactSVG
            src="/assets/icons/add-icon.svg"
            wrapper="span"
            className="icon"
          />
          <span>Add name</span>
        </CommonPill>
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} title="Add guests">
          <NewGuestForm className="content" />
        </Modal>
      )}
    </DropGuestListStyles>
  )
}

export default DropGuestList
