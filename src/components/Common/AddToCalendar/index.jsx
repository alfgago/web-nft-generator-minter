/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
import moment from "moment"
import { atcb_init } from "add-to-calendar-button"
import { useEffect, useState } from "react"

import { AddToCalendarStyles } from "./AddToCalendarStyles"

const AddToCalendar = ({ date, title, id, label = "Add reminder" }) => {
  useEffect(() => {
    atcb_init()
  }, [])

  return (
    <AddToCalendarStyles>
      <div className="atcb">
        <div className="hidden" id={`atcb-${id}`}>
          {JSON.stringify({
            name: `NFT DROP - ${title} - PlusOne`,
            iCalFileName: `${title} - PlusOne Drop Date`,
            startDate: moment(date).format("YYYY-MM-DDTHH:mm"),
            options: [
              "Apple",
              "Google",
              "iCal",
              "Microsoft365",
              "MicrosoftTeams",
              "Outlook.com",
              "Yahoo",
            ],
            timeZone: "America/New_York",
            trigger: "click",
            label: label,
          })}
        </div>
      </div>
    </AddToCalendarStyles>
  )
}

export default AddToCalendar
