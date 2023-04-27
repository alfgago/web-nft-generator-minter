// @ts-nocheck

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import { ReactSVG } from "react-svg"
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
  const [initValues, setInitValues] = useState<any>()
  const [exists, setExists] = useState(false)

  const valuesSchema = Yup.object().shape({
    name: Yup.string().required("Please enter at least 1 guest name"),
    email: Yup.string().required("Please enter at least 1 guest email"),
  })

  const onSubmit = async (values: FormValues) => {
    // this action coud affect other sections
    const { data } = await axios.post("/api/guest-lists/subscribe", {
      name: values.name,
      email: values.email,
      name2: values.name2,
      email2: values.email2,
      nft: nft.id,
      event: event.id,
    })
    setExists(true)
  }

  useEffect(() => {
    fetchData()
  }, [event, nft])

  async function fetchData() {
    try {
      if (event && nft) {
        const { data } = await axios.get(
          // @ts-ignore
          "/api/guest-lists/single?nft=" + nft.id + "&event=" + event.id
        )
        const guestList = data?.data[0].attributes
        setInitValues({
          email: guestList?.email || "",
          name: guestList?.name || "",
          email2: guestList?.email2 || "",
          name2: guestList?.name2 || "",
        })
        if (guestList?.email) {
          setExists(true)
        }
      }
    } catch (err: any) {
      setInitValues({
        email: "",
        name: "",
        email2: "",
        name2: "",
      })
    }
  }

  return (
    <NewGuestFormStyles className={className}>
      <div className="subtitle-form">
        <p>Add a new guest to the tour </p>
      </div>
      <div className="form-container">
        {initValues ? (
          <Formik
            initialValues={initValues}
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
                  {exists ? (
                    <>
                      <div className="confirmation">
                        <ReactSVG
                          className="icon"
                          src="/assets/icons/check-circle.svg"
                        />
                        Submitted
                      </div>
                      <button type="submit">
                        <CommonPill className="clickable fill small blue">
                          Update
                        </CommonPill>
                      </button>
                    </>
                  ) : (
                    <button type="submit">
                      <CommonPill className="clickable fill small blue">
                        Submit
                      </CommonPill>
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="loading">
            <img
              src="/assets/img/spinner.svg"
              className="spinner"
              alt="loader"
            />
          </div>
        )}
      </div>
    </NewGuestFormStyles>
  )
}

export default NewGuestForm
