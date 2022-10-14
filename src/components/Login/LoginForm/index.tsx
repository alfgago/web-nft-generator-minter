import React from "react"
import { LoginFormlStyles } from "./LoginFormStyles"
import { Formik, Form, Field } from "formik"

interface FormValues {
  email: string
  password: string
}

const initlValues = {
  email: "",
  password: "",
}

const onSubmit = (values: FormValues) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
  }, 500)
}

const LoginForm = () => {
  return (
    <LoginFormlStyles>
      <p>To manage tour dates and retrieve guest list</p>
      <Formik initialValues={initlValues} onSubmit={onSubmit}>
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          <Field name="password" type="password" placeholder="Password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </LoginFormlStyles>
  )
}

export default LoginForm
