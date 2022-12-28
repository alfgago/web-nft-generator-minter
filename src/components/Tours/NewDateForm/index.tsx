import React from "react"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"

import { NewDateFormStyles } from "./NewDateFormStyles"

interface FormValues {
  date: string
  name: string
  description: string
  venueName: string
  country: string
  state: string
  city: string
  artist: string
}

const NewDateForm = () => {
  const initialValues = {
    date: "",
    name: "",
    description: "",
    venueName: "",
    country: "",
    state: "",
    city: "",
    artist: "",
  }

  const valuesSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    venueName: Yup.string().required("Venue name is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    artist: Yup.string().required("Artist is required"),
  })

  async function createShow(values: FormValues) {
    const response = await axios.post("/api/events/create-show", {
      date: values.date,
      name: values.name,
      description: values.description,
      venueName: values.venueName,
      country: values.country,
      state: values.state,
      city: values.city,
      artist: values.artist,
    })
    return response
  }

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    createShow(values)
      .then((response) => {
        // Clear the form and show a success message
        resetForm()
        alert("Event created successfully")
      })
      .catch((error) => {
        // Show an error message
        alert("An error occurred")
      })
      .finally(() => {
        setSubmitting(false)
      })
  }
  return (
    <NewDateFormStyles className="content">
      <div>
        <div>
          <p>Add a new date to the tour </p>
        </div>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={valuesSchema}
          >
            {({ errors, touched }) => (
              <Form className="cols-2 in-popup">
                <label>
                  <span>Date</span>
                  {errors.date && touched.date ? (
                    <div className="alert">{errors.date}</div>
                  ) : null}
                  <Field name="date" type="date" placeholder="" />
                </label>
                <label>
                  <span>Name</span>
                  {errors.name && touched.name ? (
                    <div className="alert">{errors.name}</div>
                  ) : null}
                  <Field name="name" type="text" placeholder="" />
                </label>
                <label>
                  <span>Description</span>
                  {errors.description && touched.description ? (
                    <div className="alert">{errors.description}</div>
                  ) : null}
                  <Field name="description" type="text" placeholder="" />
                </label>
                <label>
                  <span>Venue Name</span>
                  {errors.venueName && touched.venueName ? (
                    <div className="alert">{errors.venueName}</div>
                  ) : null}
                  <Field name="venueName" type="text" placeholder="" />
                </label>
                <label>
                  <span>Country</span>
                  {errors.country && touched.country ? (
                    <div className="alert">{errors.country}</div>
                  ) : null}
                  <Field name="country" type="text" placeholder="" />
                </label>
                <label>
                  <span>State</span>
                  {errors.state && touched.state ? (
                    <div className="alert">{errors.state}</div>
                  ) : null}
                  <Field name="state" type="text" placeholder="" />
                </label>
                <label>
                  <span>City</span>
                  {errors.city && touched.city ? (
                    <div className="alert">{errors.city}</div>
                  ) : null}
                  <Field name="city" type="text" placeholder="" />
                </label>
                <label>
                  <span>Artist</span>
                  {errors.artist && touched.artist ? (
                    <div className="alert">{errors.artist}</div>
                  ) : null}
                  <Field name="artist" type="text" placeholder="" />
                </label>

                <div className="buttons">
                  <button type="submit">
                    <CommonPill className="clickable">Confirm</CommonPill>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </NewDateFormStyles>
  )
}

export default NewDateForm
