import React, { useState } from "react"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"

import { NewGuestFormStyles } from "./NewGuestFormStyles"

interface FormValues {
  nft: number
  email: string
  name: string
}

const NewGuestForm = ({
  className = "",
  event = false,
  nftData = false,
}: any) => {
  const [nftInfo, setNftInfo] = useState([])
  const initlValues = {
    email: "",
    name: "",
    nft: 0,
  }

  const valuesSchema = Yup.object().shape({
    email: Yup.string().required("Please enter the guest email"),
    name: Yup.string().required("Please enter the guest name"),
    nft: Yup.number().required("Please enter the nft"),
  })

  const onSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    // this action coud affect other sections
    const { data } = await axios.post("/api/guest-lists/create", {
      name: values.name,
      email: values.email,
      nft: Number(values.nft),
      event: event,
    })
    resetForm()
  }

  const noRepeatedVals = nftData.filter((item: any, index: number) => {
    return (
      index ===
      nftData.findIndex((obj: any) => {
        return JSON.stringify(obj) === JSON.stringify(item)
      })
    )
  })

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
                <span>Name</span>
                {errors.name && touched.name ? (
                  <div className="alert">{errors.name}</div>
                ) : null}
                <Field name="name" type="text" placeholder="Name" />
              </label>

              <label>
                <span>Email</span>
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
                <span>Nft</span>
                {errors.nft ? <div className="alert">{errors.nft}</div> : null}
                <Field
                  name="nft"
                  as="select"
                  // onChange={(e: any) => {
                  //   selectArtist(e.target.value)
                  // }}
                >
                  <option value="">-</option>
                  {noRepeatedVals.length &&
                    noRepeatedVals.map((item: any, index: number) => (
                      <option key={"artist-item" + index} value={item.id}>
                        {item.attributes.name}
                      </option>
                    ))}
                </Field>
              </label>
              <div className="btn-container">
                <button type="submit">
                  <CommonPill className="clickable fill">Submit</CommonPill>
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
