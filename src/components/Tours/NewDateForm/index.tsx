import React from "react"
import { Field, Form, Formik } from "formik"

import { NewDateFormStyles } from "./NewDateFormStyles"
const NewDateForm = () => {
  return (
    <NewDateFormStyles className="content">
      <div>
        <p>Add a new date to the tour </p>
      </div>
      <div>
        <Formik>
          <Form>
            <Field name="" type="text" placeholder="Main location" />
            <Field name="" type="text" placeholder="City" />
            <Field name="" type="text" placeholder="State" />
            <Field name="" type="text" placeholder="Date" />
          </Form>
        </Formik>
      </div>
    </NewDateFormStyles>
  )
}

export default NewDateForm
