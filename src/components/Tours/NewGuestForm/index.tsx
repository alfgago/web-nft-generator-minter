import React, { useState } from "react"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"

import { NewGuestFormStyles } from "./NewGuestFormStyles"

interface FormValues {
  name: any
  email: any
  name2: any
  email2: any
}

const NewGuestForm = ({ className = "", event, nft }: any) => {
  const initlValues = {
    email: "",
    name: "",
    email2: "",
    name2: "",
  }

  const valuesSchema = Yup.object().shape({
    name: Yup.string().required("Please enter at least 1 guest name"),
  })

  const onSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    // this action coud affect other sections
    const { data } = await axios.post("/api/guest-lists/create", {
      name: values.name,
      email: values.email,
      name2: values.name2,
      email2: values.email2,
      nft: nft.id,
      event: event.id,
    })
    resetForm()
  }

  return (
    <NewGuestFormStyles className={className}>
      <div className="subtitle-form">
        <p>Add a new guest to the tour </p>
      </div>
      <div className="form-container">
        <Formik
          initialValues={initlValues}
          onSubmit={onSubmit}
          validationSchema={valuesSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <label>
                <span>1st person's name</span>
                {errors.name && touched.name ? (
                  <div className="alert">{errors.name}</div>
                ) : null}
                <Field name="name" type="text" placeholder="Name" />
              </label>

              <label>
                <span>1st person's email</span>
                {errors.email && touched.email ? (
                  <div className="alert">{errors.email}</div>
                ) : null}
                <Field
                  name="email"
                  type="text"
                  placeholder="Email (optional)"
                />
              </label>

              <label>
                <span>2nd person's name</span>
                {errors.name2 && touched.name2 ? (
                  <div className="alert">{errors.name2}</div>
                ) : null}
                <Field name="name2" type="text" placeholder="Name" />
              </label>

              <label>
                <span>2nd person's email</span>
                {errors.email2 && touched.email2 ? (
                  <div className="alert">{errors.email2}</div>
                ) : null}
                <Field
                  name="email2"
                  type="text"
                  placeholder="Email (optional)"
                />
              </label>
              <div className="btn-container">
                <button type="submit">
                  <CommonPill className="clickable fill small blue">
                    Submit
                  </CommonPill>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </NewGuestFormStyles>
  )
}

export default NewGuestForm
