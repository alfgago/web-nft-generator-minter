import React from "react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { NewGuestFormStyles } from "./NewGuestFormStyles"

interface FormValues {
  email: string
  name: string
  phone: string
}

const NewGuestForm = ({ className = "" }: any) => {
  const initlValues = {
    email: "",
    name: "",
    phone: "",
  }

  const valuesSchema = Yup.object().shape({
    email: Yup.string().required("Please enter the guest email"),
    name: Yup.string().required("Please enter the guest name"),
    phone: Yup.string().required("Please enter the guest phone number"),
  })

  const onSubmit = async (values: FormValues) => {
    // this action coud affect other sections
    console.log(values)
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
                {/* <span>Name</span> */}
                {errors.name && touched.name ? (
                  <div className="alert">{errors.name}</div>
                ) : null}
                <Field name="name" type="text" placeholder="Name" />
              </label>

              <label>
                {/* <span>Email</span> */}
                {errors.email && touched.email ? (
                  <div className="alert">{errors.email}</div>
                ) : null}
                <Field
                  name="email"
                  type="text"
                  placeholder="Email (optional)"
                />
              </label>
              <div className="btn-container">
                <button type="submit">Submit</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </NewGuestFormStyles>
  )
}

export default NewGuestForm
