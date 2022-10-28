import React from "react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { LoginFormlStyles } from "./LoginFormStyles"
import { signIn } from "next-auth/react"
import axios from "axios"
import { error } from "console"
import { useRouter } from "next/router"
import ROUTES from "../../Common/Config/routes"
import { useState } from "react"

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
  const router = useRouter()
  const [isIncorrect, setIncorrect] = useState(false)

  const onSubmit = async (values: FormValues) => {
    //used for next-auth
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })
    if (result?.ok) {
      setIsOpen(false)
      setIncorrect(false)
      router.replace(ROUTES.ARTISTS)
      return
    }
    setIncorrect(true)
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
              {isIncorrect && (
                <ul className="alert">
                  <li>Incorrect username or password</li>
                </ul>
              )}
              {errors.email && touched.email ? (
                <div className="alert">{errors.email}</div>
              ) : null}
              <Field name="email" type="email" placeholder="Email" />
              <br />
              {errors.password && touched.password ? (
                <div className="alert">{errors.password}</div>
              ) : null}
              <Field name="password" type="password" placeholder="Password" />

              <a href="#ForgotPassword">Forgot password?</a>
              <div />
              <button type="submit">Submit</button>
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
