import React from "react"
import { ReactSVG } from "react-svg"

import CheckBox from "@/components/Common/CheckBox"
import cleanUrl from "@/utils/cleanUrl"
import dateFormat from "@/utils/dateFunctions"

import { DateItemStyles } from "./DateItemStyles"

const DateItem = ({ show, onEdit }: any) => {
  const imageUrl =
    show?.image?.data?.attributes?.formats?.thumbnail?.url ??
    "/assets/img/p1-small-vertical.jpg"
  return (
    <DateItemStyles className="item">
      <div className="card-container">
        <img src={cleanUrl(imageUrl)} alt="event image" />
        <div className="card-content">
          <div>
            <h4>{show.name}</h4>
          </div>
          {show.city && show.country && (
            <div className="address">
              {show.city}, {show.country}
            </div>
          )}
          <div className="date">{dateFormat(show.date)}</div>
        </div>
        <ReactSVG
          title={"Edit " + show.name}
          className="edit icon"
          src="/assets/icons/edit.svg"
          onClick={() => onEdit()}
        />
      </div>
    </DateItemStyles>
  )
}

export default DateItem
