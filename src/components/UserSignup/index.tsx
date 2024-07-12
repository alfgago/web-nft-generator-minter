import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { ReactSVG } from "react-svg";
import { useAccount, useConnect, useDisconnect } from "@thirdweb-dev/react";
import * as Yup from "yup";

import { CommonPill } from "../Common/CommonStyles";
import { UserSignUpStyles } from "./UserSignUpStyles"; // You can define the styles for this component

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const UserSignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
});

const UserSignUp = () => {
  const formikRef = useRef(null) as any;
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmittedMetamask, setSubmittedMetamask] = useState(false);
  const { address } = useAccount();
  const { connect, disconnect } = useConnect();
  const { logout } = useDisconnect();

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  const onSubmit = async (values: FormValues, walletType: string) => {
    setSubmitted(false);
    setSubmitting(true);
    // Decide which function to call based on the wallet type
    if (walletType === "thirdweb") {
      await loginWithThirdweb(values);
    } else if (walletType === "metamask") {
      await loginWithMetamask(values);
    }
  };

  const loginWithMetamask = async (values: FormValues) => {
    connect();
    setSubmittedMetamask(true);
  };

  const registerMetamaskUser = async () => {
    if (address && isSubmittedMetamask) {
      const signupValues = {
        ...formikRef.current?.values,
        paper_id: null,
        wallet: address,
        signup_type: "metamask",
      };

      const user = await axios.post("/api/users/guest-signup", signupValues);
      setUser(user);
      setSubmitted(true);
      setSubmitting(false);

      setTimeout(function () {
        window.location.reload();
      }, 1500);
    }
  };

  useEffect(() => {
    registerMetamaskUser();
  }, [isSubmittedMetamask, address]);

  const loginWithThirdweb = async (values: FormValues) => {
    try {
      const login = await connect();
      const signupValues = {
        ...values,
        paper_id: null,
        wallet: login.data.address,
        signup_type: "thirdweb",
      };

      const user = await axios.post("/api/users/guest-signup", signupValues);
      setUser(user);

      setSubmitted(true);

      setTimeout(function () {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error during loginWithThirdweb:", error);
    }
    setSubmitting(false);
  };

  // Event handlers for buttons
  const handleThirdwebWalletSignup = () => {
    console.log("handleThirdwebWalletSignup");
    const values = formikRef.current?.values; // Access form values from Formik ref
    onSubmit(values, "thirdweb");
  };

  const handleMetamaskSignup = () => {
    console.log("handleMetamaskSignup");
    const values = formikRef.current?.values; // Access form values from Formik ref
    onSubmit(values, "metamask");
  };

  return (
    <UserSignUpStyles className="content">
      <div>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            validationSchema={UserSignUpSchema}
            onSubmit={null}
            innerRef={formikRef}
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
                      <span>Phone Number (optional)</span>
                      <Field name="phoneNumber" type="tel" placeholder="" />
                    </label>

                    <div className="buttons">
                      <div onClick={() => handleThirdwebWalletSignup()}>
                        <CommonPill className="clickable small black">
                          Signup with Thirdweb
                        </CommonPill>
                      </div>
                      <div onClick={() => handleMetamaskSignup()}>
                        <CommonPill className="clickable small black">
                          Signup with Metamask
                        </CommonPill>
                      </div>
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
  );
};

export default UserSignUp;
