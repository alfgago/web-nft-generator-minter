import React from "react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { NewDateFormStyles } from "./NewDateFormStyles"

interface FormValues {
  locationName: string
  city: string
  state: string
  date: string
}

const NewDateForm = () => {
  const initlValues = {
    locationName: "",
    city: "",
    state: "",
    date: "",
  }

  const valuesSchema = Yup.object().shape({
    locationName: Yup.string().required("Please enter the location name"),
    city: Yup.string().required("Please enter the city of the event"),
    state: Yup.string().required("Please enter the state of the event"),
    date: Yup.string().required("please enter the date of the event"),
  })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }
  return (
    <NewDateFormStyles className="content">
      <div>
        <p>Add a new date to the tour </p>
      </div>
      <div className="form-container">
        <Formik
          initialValues={initlValues}
          onSubmit={onSubmit}
          validationSchema={valuesSchema}
        >
          {({ errors, touched }) => (
            <Form>
              {errors.locationName && touched.locationName ? (
                <div className="alert">{errors.locationName}</div>
              ) : null}
              <Field
                name="locationName"
                type="text"
                placeholder="Location Name"
              />
              {errors.city && touched.city ? (
                // alert("error")
                <div className="alert">{errors.city}</div>
              ) : null}
              <Field name="city" type="text" placeholder="City" />

              {errors.state && touched.state ? (
                <div className="alert">{errors.state}</div>
              ) : null}
              <Field name="state" type="text" placeholder="State" />

              {errors.date && touched.date ? (
                <div className="alert">{errors.date}</div>
              ) : null}
              <Field name="date" type="date" placeholder="Date" />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </NewDateFormStyles>
  )
}

export default NewDateForm
