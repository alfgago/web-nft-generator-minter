import React from "react"

import { PassPreviewStyles } from "./PassPreviewStyles"

const PassPreview = ({ previewUrl, formikValues }: any) => {
  const dateFormat = () => {
    if (!formikValues.date) {
      return
    }
    const date = new Date(formikValues.date)
    const month = date.toLocaleString("default", { month: "short" })
    const day = date.toLocaleString("default", { day: "numeric" })
    const year = date.toLocaleString("default", { year: "numeric" })
    return `${month} ${day} ${year}`
  }

  console.log(formikValues)
  return (
    <PassPreviewStyles className="pass-preview">
      <div className="inner">
        <div className="main-image">
          <img src={previewUrl} alt="Image preview" />
          <div className="text">
            <div className="venue">{formikValues.name}</div>
            <div className="address">
              {formikValues.city}, {formikValues.country}
            </div>
            <div className="date">{dateFormat()}</div>
          </div>
        </div>
        <div className="right">
          <img
            className="p1-vert"
            src="/assets/img/p1-small-vertical.jpg"
            alt="p1-small-vertical"
          />
          <div className="text">Guest Pass #1</div>
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
