import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"

import { FormStepStyles } from "./FormStepStyles"

const FormStep = ({ formValues, nextAction }: any) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your project name"),
    wallet: Yup.string().required("Please enter your wallet"),
    size: Yup.number().required("Please enter your collection size."),
    passType: Yup.string().required("Please enter your pass type"),
    saleType: Yup.string().required("Please enter your sale type"),
    price: Yup.number().required("Please enter your price"),
  })

  interface FormValues {
    name: string
    wallet: string
    size: number
    passType: string
    saleType: string
    price: number
  }

  const submit = async (values: FormValues) => {
    nextAction(values)
  }

  return (
    <FormStepStyles>
      <h2>Project Metadata</h2>
      <Formik
        initialValues={formValues}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className="generator-form trap">
            <label>
              <span>Collection name</span>
              {errors.name && touched.name ? (
                <div className="alert">{errors.name}</div>
              ) : null}
              <Field type="text" name="name" />
            </label>
            <label>
              <span>Royalty Wallet Address</span>
              {errors.wallet && touched.wallet ? (
                <div className="alert">{errors.wallet}</div>
              ) : null}
              <Field type="text" name="wallet" />
            </label>
            <label>
              <span>Collection size</span>
              {errors.size && touched.size ? (
                <div className="alert">{errors.size}</div>
              ) : null}
              <Field type="number" name="size" />
            </label>
            <label>
              <span>Pass Type</span>
              {errors.passType && touched.passType ? (
                <div className="alert">{errors.passType}</div>
              ) : null}
              <Field name="passType" as="select">
                <option value="">-</option>
                <option value="lottery">Lottery</option>
                <option value="tour">Tour</option>
                <option value="single">Single Event</option>
              </Field>
            </label>
            <label>
              <span>Sale Type</span>
              {errors.saleType && touched.saleType ? (
                <div className="alert">{errors.saleType}</div>
              ) : null}
              <Field name="saleType" as="select">
                <option value="">-</option>
                <option value="auction">Auction</option>
                <option value="fixed">Fixed Price</option>
              </Field>
            </label>
            <label>
              <span>Initial auction price / Fixed price (ETH)</span>
              {errors.price && touched.price ? (
                <div className="alert">{errors.price}</div>
              ) : null}
              <Field type="number" name="price" />
            </label>

            <div className="buttons">
              <button type="submit">
                <CommonPill className="clickable">Next</CommonPill>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </FormStepStyles>
  )
}

export default FormStep
