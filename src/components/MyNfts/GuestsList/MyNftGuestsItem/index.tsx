import React from "react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

import NewGuestForm from "@/components/Tours/NewGuestForm"

import { MyNftGuestsItemStyles } from "./MyNftGuestsItemStyles"

interface FormValues {
  email: string
  name: string
}

const MyNftGuestsItem = ({ guestData }: any) => {
  console.log(guestData)
  return (
    <MyNftGuestsItemStyles>
      <div className="event-info-cont">
        <div>
          <img src={guestData.image} alt="" />
        </div>
        <div className="location-info-cont">
          <p>{guestData.venue},</p>
          <p>
            {guestData.city}, {guestData.state},
          </p>
          <p>{guestData.date}</p>
        </div>
      </div>
      <div className="form-cont">
        <p>Info</p>
        <NewGuestForm />
      </div>
    </MyNftGuestsItemStyles>
  )
}

export default MyNftGuestsItem
