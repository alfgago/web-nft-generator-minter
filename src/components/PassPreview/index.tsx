import React from "react"

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
  const dateFormat = () => {
    if (!date) {
      return
    }
    const d = new Date(date)
    const month = d.toLocaleString("default", { month: "short" })
    const day = d.toLocaleString("default", { day: "numeric" })
    const year = d.toLocaleString("default", { year: "numeric" })
    return `${month} ${day} ${year}`
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
            <div className="date">{dateFormat()}</div>
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
