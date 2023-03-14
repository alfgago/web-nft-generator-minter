import React, { useRef, useState } from "react"
import { ExportToCsv } from "export-to-csv"
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

const DropGuestList = ({ guestsInfo, eventInfo }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [eventsGuests, setEventsGuests] = useState([])

  const orderList = guestsInfo.map((item: any) => {
    return {
      guestName: item.name,
      artistName: eventInfo.attributes.artist.data.attributes.name,
      showName: eventInfo.attributes.name,
      showAddress: eventInfo.attributes.address,
    }
  })

  const createPdf = () => {
    // Create a new PDF document
    // eslint-disable-next-line new-cap
    const doc = new jsPDF()

    const list = orderList.map((item: any, index: number = 1) => [
      item.guestName,
      item.artistName,
      item.showName,
      item.showAddress,
    ])

    doc.text("Guest List", 15, 10).setFont("bold")

    autoTable(doc, {
      head: [
        [
          "Guest Name",
          "Artist Name",
          "Show Name",
          "Event Address",
          "Attendance",
        ],
      ],
      body: list,
    })

    doc.save("Guest-List.pdf")
  }

  const createCsv = () => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Guests List",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      filename: "Guests-List",
      headers: [
        "Guest Name",
        "Artist Name",
        "Show Name",
        "Event Address",
        "Attendance",
      ],
    }

    const csvExporter = new ExportToCsv(options)

    csvExporter.generateCsv(orderList)
  }

  console.log(guestsInfo)

  return (
    <DropGuestListStyles>
      <ItemPagination
        itemsPerPage={3}
        values={guestsInfo}
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
        <div className="export-cont">
          <CommonPill className="clickable small" onClick={() => createPdf()}>
            <span>Export to PDF</span>
          </CommonPill>

          <CommonPill className="clickable small" onClick={() => createCsv()}>
            <span>Export to CSV</span>
          </CommonPill>
        </div>

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
