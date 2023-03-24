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
    }
  })

  const docTitle = eventInfo.attributes.name + " Guest List"

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

    // Get the width of the document
    const pdfWidth = doc.internal.pageSize.getWidth()
    // Add the image
    const imgData = "https://plusonemusic.io/assets/img/pdf-header.jpg"
    doc.addImage(imgData, "JPEG", 0, 0, pdfWidth, 0)

    const title =
      "Guest List for " + eventInfo.attributes.artist.data.attributes.name

    const address = eventInfo.attributes.country
      ? eventInfo.attributes.country + ", " + eventInfo.attributes.city
      : ""
    const subtitle = eventInfo.attributes.name + " " + address

    doc.setFontSize(30)
    doc.text(title, 15, 35) // Adjusted y-coordinate to 20
    doc.setFontSize(20)
    doc.text(subtitle, 15, 45) // Adjusted y-coordinate to 28

    doc.setFontSize(14)
    autoTable(doc, {
      startY: 50,
      head: [
        [
          {
            content: "Guest Name",
            styles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
          },
          {
            content: "Attendance",
            styles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
          },
        ],
      ],
      body: list,
    })

    doc.save(docTitle + ".pdf")
  }

  const createCsv = () => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: docTitle,
      headers: ["Guest Name", "Attendance"],
    }

    const csvExporter = new ExportToCsv(options)

    csvExporter.generateCsv(orderList)
  }

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
