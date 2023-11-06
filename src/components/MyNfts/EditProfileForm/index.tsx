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
  wallet: string // added this field as it's being used in updateProfile function
}
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
}

const EditProfileForm = ({ wallet }) => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<FormValues | null>(null)

  // Fetch the data in the useEffect hook
  useEffect(() => {
    async function fetchData() {
      try {
        if (!user) {
          const { data } = await axios.get(
            `/api/users/by-wallet?wallet=${wallet}`
          )
          setUser({
            firstName: data.user.attributes.name,
            lastName: data.user.attributes.last_name,
            email: data.user.attributes.email,
            phoneNumber: data.user.attributes.phone,
            wallet: data.user.attributes.wallet, // We assume that wallet is a non-changing value.
          })
        }
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [user, wallet])

  const valuesSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  })

  async function updateProfile(values: FormValues) {
    const response = await axios.patch("/api/user/update", {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
    })
    return response
  }

  const onSubmit = async (values: FormValues, { setSubmitting, resetForm }) => {
    setSubmitting(true)

    try {
      await updateProfile(values)
      // resetForm(); // uncomment if you want to reset the form after submitting
      // You might want to provide some user feedback here as well
    } catch (error) {
      alert(
        "An error occurred while updating the profile. Please contact us if this is a repeated issue."
      )
      console.error(error)
    } finally {
      setSubmitting(false)
      window.location.reload() // Consider using a more React-friendly approach than reloading the page, like updating state
    }
  }

  return (
    <EditProfileFormStyles className="content">
      <div>
        <div className="form-container">
          {user?.wallet ? (
            <Formik
              initialValues={user}
              onSubmit={onSubmit}
              validationSchema={valuesSchema}
            >
              {({ isSubmitting, errors, touched, values, setFieldValue }) => (
                <div className="in-popup">
                  {!isSubmitting ? (
                    <>
                      <Form className="cols-2">
                        <label className="full">
                          <span>Username</span>
                          <Field name="username" type="text" placeholder="" />
                          {errors.username && touched.username ? (
                            <div className="alert">{errors.username}</div>
                          ) : null}
                        </label>
                        <div className="separator" />
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
                            <CommonPill className="clickable">
                              Confirm
                            </CommonPill>
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
          ) : (
            <div className="loading">
              <img
                src="/assets/img/spinner-black.svg"
                className="spinner"
                alt="loader"
              />
            </div>
          )}
        </div>
      </div>
    </EditProfileFormStyles>
  )
}

export default EditProfileForm
