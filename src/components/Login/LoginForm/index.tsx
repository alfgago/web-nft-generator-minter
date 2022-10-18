import React from "react"
import { Field, Form, Formik, ErrorMessage } from "formik"
import * as Yup from "yup"

import { LoginFormlStyles } from "./LoginFormStyles"
import { DiffieHellmanGroup } from "crypto"

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
  password: Yup.string().required("Please enter your password"),
})

const LoginForm = () => {
  const spread = (txt: any) => {
    let array = txt.split(",")
    console.log(array)
    return array
  }

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
              {errors.email && touched.email ? (
                <div className="alert">{errors.email}</div>
              ) : null}
              <Field name="email" type="email" placeholder="Email" />
              <br></br>
              {errors.password && touched.password ? (
                <div className="alert">{errors.password}</div>
              ) : null}
              <Field name="password" type="password" placeholder="Password" />
              <br></br>

              <div className="">
                <a href="#ForgotPassword">Forgot password?</a>
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
