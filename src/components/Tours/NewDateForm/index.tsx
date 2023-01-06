import React from "react"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"
import LocationPicker from "@/components/Common/LocationPicker"

import { NewDateFormStyles } from "./NewDateFormStyles"

interface FormValues {
  date: string
  name: string
  description: string
  address: string
  latitude: number
  longitude: number
  artist: string
}

const NewDateForm = () => {
  const initialValues = {
    date: "",
    name: "",
    description: "",
    address: "",
    latitude: 0,
    longitude: 0,
    artist: "",
  }

  const valuesSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    artist: Yup.string().required("Artist is required"),
  })

  async function createShow(values: FormValues) {
    const response = await axios.post("/api/shows/create", {
      date: values.date,
      name: values.name,
      description: values.description,
      address: values.address,
      latitude: values.latitude,
      longitude: values.longitude,
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
            {({ errors, touched, setFieldValue }) => (
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
                <label className="full">
                  <span>Venue</span>
                  <LocationPicker setFieldValue={setFieldValue} />
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
