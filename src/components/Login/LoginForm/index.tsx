import React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"

import { LoginFormlStyles } from "./LoginFormStyles"

interface FormValues {
  email: string
  password: string
}

const initlValues = {
  email: "",
  password: "",
}

const valuesSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Please enter your password"),
})

const LoginForm = ({ setIsOpen }: any) => {
  const [isIncorrect, setIncorrect] = useState(false)

  const onSubmit = async (values: FormValues) => {
    // used for next-auth
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })

    if (result?.ok) {
      if (setIsOpen) {
        setIsOpen(false)
      }
      setIncorrect(false)
      window.location.reload()
      window.location.href = process.env.NEXT_PUBLIC_DOMAIN + "/tour-manager"
      return
    }
    setIncorrect(true)
  }

  return (
    <LoginFormlStyles>
      <div className="container">
        <p className="subtitle">To manage tour dates and retrieve guest list</p>
        {isIncorrect && (
          <div>
            <span className="alert">Incorrect username or password</span>
          </div>
        )}
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
              <Field name="email" type="text" placeholder="Email" />
              <br />
              {errors.password && touched.password ? (
                <div className="alert">{errors.password}</div>
              ) : null}
              <Field name="password" type="password" placeholder="Password" />

              <a href="#ForgotPassword">Forgot password?</a>
              <div />
              <button type="submit">
                <CommonPill className="clickable black small">
                  Log in
                </CommonPill>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </LoginFormlStyles>
  )
}

export default LoginForm
