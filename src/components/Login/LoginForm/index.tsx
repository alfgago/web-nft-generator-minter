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
      <div className="container">
        <p className="subtitle">To manage tour dates and retrieve guest list</p>
        <Formik initialValues={initlValues} onSubmit={onSubmit}>
          <Form>
            <Field name="email" type="email" placeholder="Email" />
            <br></br>
            <Field name="password" type="password" placeholder="Password" />
            <div className="">
              <a href="#ForgitPassword">Forgot password?</a>
              <div className="btn-container">
                <button type="submit">Submit</button>
              </div>
            </div>
          </Form>
        </Formik>
        <p>Not account yet?</p>
        <a href="#register">Register</a>
      </div>
    </LoginFormlStyles>
  )
}

export default LoginForm
