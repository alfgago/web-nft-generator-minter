import React, { useRef, useState } from "react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { parse } from "querystring"
import { ReactSVG } from "react-svg"

import AddButton from "@/components/Common/AddButton"
import Button from "@/components/Common/Button"
import { CommonPill } from "@/components/Common/CommonStyles"
import ItemPagination from "@/components/Common/ItemPagination"
import Modal from "@/components/Common/Modal"
import NewGuestForm from "@/components/Tours/NewGuestForm"

import GuestItem from "../GuestItem"

import { DropGuestListStyles } from "./DropGuestListStyles"

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
}
const colstyle = {
  width: "30%",
}
const tableStyle = {
  width: "100%",
}

const DropGuestList = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [eventsGuests, setEventsGuests] = useState([])

  const pdfBody = useRef<any>(null)

  const createPdf = (guests: any) => {
    // Create a new PDF document
    // eslint-disable-next-line new-cap
    const doc = new jsPDF()

    const list = guests.map((item: any, index: number = 1) => [
      item.name,
      item.email,
    ])

    doc.text("Guest List", 15, 10).setFont("bold")

    autoTable(doc, {
      head: [["Name", "Email", "Attendance"]],
      body: list,
    })

    doc.save("Guest-List.pdf")
  }

  return (
    <DropGuestListStyles>
      <ItemPagination
        itemsPerPage={3}
        values={data}
        render={(items: any) => {
          setEventsGuests(data)
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
          onClick={() => createPdf(eventsGuests)}
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
