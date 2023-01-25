import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import { ReactSVG } from "react-svg"
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

const initialValues = {
  date: "",
  name: "",
  description: "",
  address: "",
  latitude: 0,
  longitude: 0,
  artist: "",
}

const NewDateForm = () => {
  const { data: user } = useSession()
  const [artists, setArtists] = useState([])

  async function fetchData() {
    try {
      if (user) {
        const { data } = await axios.get(
          // @ts-ignore
          "/api/artists?limit=10&user=" + user.id
        )
        const artists = data.data
        setArtists(artists)
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  // Fetch the data in the useEffect hook
  useEffect(() => {
    fetchData()
  }, [])

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
        resetForm()
      })
      .catch((error) => {
        // Show an error message
        alert("An error occurred adding the event")
      })
      .finally(() => {
        setSubmitting(false)
        window.location.reload()
      })
  }
  return (
    <NewDateFormStyles className="content">
      <div>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={valuesSchema}
          >
            {({ isSubmitting, errors, touched, setFieldValue }) => (
              <div className="in-popup">
                {!isSubmitting ? (
                  <>
                    <div>
                      <p>Add a new date to the tour </p>
                    </div>
                    <Form className="cols-2">
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

                        <Field name="artist" as="select">
                          <option value="">- Select an artist -</option>
                          {artists.map((item: any) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.attributes.name}
                              </option>
                            )
                          })}
                        </Field>
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
    </NewDateFormStyles>
  )
}

export default NewDateForm
