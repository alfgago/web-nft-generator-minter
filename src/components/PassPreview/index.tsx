import React from "react"

import dateFormat from "@/utils/dateFunctions"

import { PassPreviewStyles } from "./PassPreviewStyles"

const PassPreview = ({
  previewUrl,
  template = "single",
  name,
  city,
  country,
  date,
  number = 1,
  customClass = "default",
}: any) => {
  const passDateFormat = () => {
    if (!date) {
      return ""
    }
    return dateFormat(date)
  }

  return (
    <PassPreviewStyles
      className={"pass-preview " + customClass + " " + template}
    >
      <div className="inner">
        <div className="bg" />
        <div className="main-image">
          <img src={previewUrl} alt="Image preview" />
          <div className="text">
            <div className="venue">{name}</div>
            <div className="address">
              {city}, {country}
            </div>
            <div className="date">{passDateFormat()}</div>
          </div>
        </div>
        <div className="right">
          {template == "golden" ? (
            <img
              className="p1-vert"
              src="/assets/img/p1-vert-white.svg"
              alt="p1-vert-white"
            />
          ) : (
            <img
              className="p1-vert"
              src="/assets/img/p1-small-vertical.jpg"
              alt="p1-small-vertical"
            />
          )}
          <div className="text">
            <div>Guest</div>
            <div>Pass</div>
            <div>#{number}</div>
          </div>
          <img
            className="qr"
            src="/assets/img/sample-qr.png"
            alt="sample QR PlusOne"
          />
        </div>
      </div>
    </PassPreviewStyles>
  )
}

export default PassPreview
