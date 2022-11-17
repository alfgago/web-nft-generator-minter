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

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }
  return (
    <NewDateFormStyles className="content">
      <div>
        <p>Add a new date to the tour </p>
      </div>
      <div>
        <Formik initialValues={initlValues} onSubmit={onSubmit}>
          {({ errors, touched }) => (
            <Form>
              <Field
                name="locationName"
                type="text"
                placeholder="Main location"
              />
              <Field name="city" type="text" placeholder="City" />
              <Field name="state" type="text" placeholder="State" />
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
