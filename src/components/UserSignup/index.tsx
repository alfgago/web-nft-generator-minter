import React, { useRef, useState } from "react"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import { ReactSVG } from "react-svg"
import * as Yup from "yup"

import { CommonPill } from "../Common/CommonStyles"
import { usePaperSDKContext } from "../PaperSDKProvider"

import { UserSignUpStyles } from "./UserSignUpStyles" // You can define the styles for this component

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

const UserSignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
})

const UserSignUp = () => {
  const { paperSdk, setUser } = usePaperSDKContext()
  const [signupOption, setSignupOption] = useState<string | null>(null)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  }

  const onSubmit = async (values: FormValues) => {
    setSubmitted(false)
    setSubmitting(true)
    await loginWithPaper(values)
  }

  const loginWithPaper = async (values: FormValues) => {
    try {
      const login = await paperSdk.auth.loginWithPaperModal()

      const signupValues = {
        ...values,
        user: login.user, // Include the user data from login
      }

      const user = await axios.post("/api/users/signup", signupValues)
      setUser(user)

      setSubmitted(true)
    } catch (error) {
      console.error("Error during loginWithPaper:", error)
    }
    setSubmitting(false)
  }

  return (
    <UserSignUpStyles className="content">
      <div>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            validationSchema={UserSignUpSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <div className="signup-form in-popup">
                {!isSubmitted ? (
                  <Form className="cols-2">
                    <label>
                      <span>First Name</span>
                      <Field name="firstName" type="text" placeholder="" />
                      {errors.firstName && touched.firstName ? (
                        <div className="alert">{errors.firstName}</div>
                      ) : null}
                    </label>
                    <label>
                      <span>Last Name</span>
                      <Field name="lastName" type="text" placeholder="" />
                      {errors.lastName && touched.lastName ? (
                        <div className="alert">{errors.lastName}</div>
                      ) : null}
                    </label>
                    <label>
                      <span>Email</span>
                      <Field name="email" type="email" placeholder="" />
                      {errors.email && touched.email ? (
                        <div className="alert">{errors.email}</div>
                      ) : null}
                    </label>
                    <label>
                      <span>Phone Number</span>
                      <Field name="phoneNumber" type="tel" placeholder="" />
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <div className="alert">{errors.phoneNumber}</div>
                      ) : null}
                    </label>

                    <div className="buttons">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => setSignupOption("paperWallet")}
                      >
                        <CommonPill className="clickable small black">
                          Signup with Email
                        </CommonPill>
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => setSignupOption("metamask")}
                      >
                        <CommonPill className="clickable small black">
                          Signup with Metamask
                        </CommonPill>
                      </button>
                    </div>
                  </Form>
                ) : (
                  <div className="success">
                    <ReactSVG src="/assets/icons/check-circle.svg" />
                    User signed up successfully
                  </div>
                )}
              </div>
            )}
          </Formik>
        </div>
      </div>
    </UserSignUpStyles>
  )
}

export default UserSignUp
