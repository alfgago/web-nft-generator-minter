import React from "react"
import { Field, Form, Formik, withFormik } from "formik"
import * as Yup from "yup"

import { LoginFormlStyles } from "./LoginFormStyles"

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

const valuesSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
})

const LoginForm = () => {
  return (
    <LoginFormlStyles>
      <div className="container">
        <p className="subtitle">To manage tour dates and retrieve guest list</p>
        <Formik
          initialValues={initlValues}
          onSubmit={onSubmit}
          validationSchema={valuesSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="email" type="email" placeholder="Email" />
              {errors.email && touched.email ? <p>{errors.email}</p> : null}
              <br />
              <Field name="password" type="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : null}
              <div className="">
                <a href="#ForgitPassword">Forgot password?</a>
                <div className="btn-container">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <p className="register-cont">No account yet?</p>
        <a href="#register">Register</a>
      </div>
    </LoginFormlStyles>
  )
}

export default LoginForm
