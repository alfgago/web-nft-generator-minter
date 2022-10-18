import React from "react"
import { LoginFormlStyles } from "./LoginFormStyles"
import { Formik, Form, Field, withFormik } from "formik"
import * as Yup from "yup"

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
          onSubmit={(values) => {
            console.log(values)
          }}
          validationSchema={valuesSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="email" type="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <ul>
                  <li>{errors.email}</li>
                </ul>
              ) : null}
              <br></br>
              <Field name="password" type="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <p className="alert">{errors.password}</p>
              ) : null}

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
