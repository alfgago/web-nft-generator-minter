/* eslint-disable no-else-return */
// @ts-nocheck
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { Field, FieldArray, Form, Formik } from "formik"
import { ReactSVG } from "react-svg"
import sanitizeHtml from "sanitize-html"
import Strapi from "strapi-sdk-js"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"

import { EditProfileFormStyles } from "./EditProfileFormStyles"

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
}

const EditProfileForm = ({ wallet }) => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [user, setUser] = useState(false)

  // Fetch the data in the useEffect hook
  useEffect(() => {
    async function fetchData() {
      try {
        if (!user) {
          const { data } = await axios.get(
            // @ts-ignore
            "/api/guests/by-wallet?wallet=" + wallet
          )
          setUser(data)
        }
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const valuesSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  })

  async function updateProfile(values: any) {
    const response = await axios.patch("/api/user/update", {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
      wallet: values.wallet,
    })
    return response
  }

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    setSubmitting(true)

    updateProfile(values)
      .then((response) => {
        // resetForm()
      })
      .catch((error) => {
        // Show an error message
        alert(
          "An error occurred adding the event. Please contact us if this is a repeated issue."
        )
        console.log(error)
      })
      .finally(() => {
        setSubmitting(false)
        window.location.reload()
      })
  }

  return (
    <EditProfileFormStyles className="content">
      <div>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={valuesSchema}
          >
            {({ isSubmitting, errors, touched, values, setFieldValue }) => (
              <div className="in-popup">
                {!isSubmitting ? (
                  <>
                    <Form className="cols-2">
                      <label>
                        <span>First Name</span>
                        <Field name="firstName" type="text" placeholder="" />
                        {errors.firstName && touched.firstName ? (
                          <div className="alert">{errors.firstName}</div>
                        ) : null}
                      </label>
                      <label>
                        <span>Last Name</span>
                        <Field name="lastName" type="text" placeholder="" />
                        {errors.lastName && touched.lastName ? (
                          <div className="alert">{errors.lastName}</div>
                        ) : null}
                      </label>
                      <label>
                        <span>Email</span>
                        <Field name="email" type="email" placeholder="" />
                        {errors.email && touched.email ? (
                          <div className="alert">{errors.email}</div>
                        ) : null}
                      </label>
                      <label>
                        <span>Phone Number (optional)</span>
                        <Field name="phoneNumber" type="tel" placeholder="" />
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <div className="alert">{errors.phoneNumber}</div>
                        ) : null}
                      </label>

                      <div className="buttons">
                        <button type="submit">
                          <CommonPill className="clickable">Confirm</CommonPill>
                        </button>
                      </div>
                    </Form>
                  </>
                ) : (
                  <div className="success">
                    <ReactSVG src="/assets/icons/check-circle.svg" />
                    Event created successfully
                  </div>
                )}
              </div>
            )}
          </Formik>
        </div>
      </div>
    </EditProfileFormStyles>
  )
}

export default EditProfileForm
