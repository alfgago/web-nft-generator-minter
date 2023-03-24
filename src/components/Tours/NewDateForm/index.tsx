import React, { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import { ReactSVG } from "react-svg"
import Strapi from "strapi-sdk-js"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"
import PassPreview from "@/components/PassPreview"

import { NewDateFormStyles } from "./NewDateFormStyles"

interface FormValues {
  date: string
  name: string
  country: string
  city: string
  artist: string
  image: File | null // Add image field
}

const initialValues = {
  date: "",
  name: "",
  country: "",
  city: "",
  artist: "",
  image: null, // Add image field
}

const NewDateForm = () => {
  const { data: user } = useSession()
  const [artists, setArtists] = useState([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const formikRef = useRef(null) as any

  async function uploadImageToStrapi(file: File) {
    // Function to upload the image to Strapi
    const formData = new FormData()
    formData.append("files", file)

    const strapi = new Strapi({
      url: "https://plusone.stag.host",
      prefix: "/api",
      store: {
        key: "strapi_jwt",
        useLocalStorage: false,
        cookieOptions: { path: "/" },
      },
      axiosOptions: {
        headers: {
          Authorization: `Bearer 2ca1d8120bae3fc23a56a6e25a9bf46605f3a154e7fcbc71767228515db89ca5156ae736595a96fba22ccc7bc28d409e73183e102c771f692f3c7491303149d98c4962e6912ae9e538dc24153a28eca6c8c3aef6beed86fd600522173d1d391262438e9a7782330dbee30a2154c0cf24df96a9b7d1a2cf85c3ed11f243ff0f65`,
        },
      },
    })

    const response = await strapi.axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data[0].id
  }

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
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("city is required"),
    artist: Yup.string().required("Artist is required"),
  })

  async function createShow(values: FormValues) {
    const response = await axios.post("/api/shows/create", {
      date: values.date,
      name: values.name,
      country: values.country,
      city: values.city,
      artist: values.artist,
      image: values.image,
    })
    return response
  }

  // Function to handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])
      setPreviewUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    // Upload image to Strapi
    if (imageFile) {
      const imageId = await uploadImageToStrapi(imageFile)
      values.image = imageId
    }
    createShow(values)
      .then((response) => {
        resetForm()
      })
      .catch((error) => {
        // Show an error message
        alert("An error occurred adding the event")
      })
      .finally(() => {
        window.location.reload()
        setSubmitting(false)
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
            innerRef={formikRef}
          >
            {({ isSubmitting, errors, touched, setFieldValue }) => (
              <div className="in-popup">
                {!isSubmitting ? (
                  <>
                    <Form className="cols-2">
                      <label className="full">
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
                      <label>
                        <span>Date</span>
                        {errors.date && touched.date ? (
                          <div className="alert">{errors.date}</div>
                        ) : null}
                        <Field name="date" type="date" placeholder="" />
                      </label>
                      <label>
                        <span>Venue/Festival Name</span>
                        {errors.name && touched.name ? (
                          <div className="alert">{errors.name}</div>
                        ) : null}
                        <Field name="name" type="text" placeholder="" />
                      </label>
                      <label>
                        <span>Country</span>
                        <Field name="country" type="text" placeholder="" />
                      </label>
                      <label>
                        <span>City</span>
                        <Field name="city" type="text" placeholder="" />
                      </label>

                      <label className="image">
                        <span>Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          required
                        />
                        <div className="description">
                          Recommended image size: 1000x750
                        </div>
                      </label>
                      {previewUrl && (
                        <label>
                          <span>Pass Preview</span>
                          <PassPreview
                            previewUrl={previewUrl}
                            name={formikRef.current.values.name}
                            city={formikRef.current.values.city}
                            country={formikRef.current.values.country}
                            date={formikRef.current.values.date}
                          />
                        </label>
                      )}

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
