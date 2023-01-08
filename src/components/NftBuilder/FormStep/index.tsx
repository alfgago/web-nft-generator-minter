// @ts-nocheck
import { useState } from "react"
import { Field, Form, Formik } from "formik"
import DatePicker from "react-datepicker"
import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"

import { FormStepStyles } from "./FormStepStyles"

import "react-datepicker/dist/react-datepicker.css"

const FormStep = ({ formValues, nextAction, artists }: any) => {
  const [collectionTitle, setCollectionTitle] = useState("")
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your project name"),
    dropDate: Yup.string().required("Please enter the mint date"),
    wallet: Yup.string().required("Please enter your wallet"),
    size: Yup.number().required("Please enter your collection size."),
    passType: Yup.string().required("Please enter your pass type"),
    saleType: Yup.string().required("Please enter your sale type"),
    price: Yup.number().required("Please enter your price"),
  })

  interface FormValues {
    name: string
    dropDate: Date
    wallet: string
    size: number
    winners: number
    passType: string
    saleType: string
    artist: number
    show: string
    duration: number
    price: number
    tourFrom: Date
    tourTo: Date
    lotteryDate: Date
  }

  const submit = async (values: FormValues) => {
    console.log(values)
    nextAction(values)
  }

  const generateName = (
    artistId: number,
    passType: any,
    setFieldValue: any
  ) => {
    const type = passType.charAt(0).toUpperCase() + passType.slice(1)
    const sel = artists.find((obj: any) => obj.id == artistId)
    let title = ""
    if (sel) {
      title = `${sel.attributes.name} ${type} Pass`
    }
    setFieldValue("name", title)
    setCollectionTitle(title)
  }

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  return (
    <FormStepStyles>
      <h2>
        Collection Data {collectionTitle && <span> - {collectionTitle}</span>}
      </h2>
      <Formik
        initialValues={formValues}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="generator-form trap cols-2">
            <label className="hidden">
              <span>Collection name</span>
              <input
                className="name-field"
                type="text"
                name="name"
                value={values.name}
                placeholder="AUTOGENERATED"
                readOnly
              />
            </label>
            <label>
              <span>Artist</span>
              {errors.artist && touched.artist ? (
                <div className="alert">{errors.artist}</div>
              ) : null}
              <Field
                name="artist"
                as="select"
                onChange={(e: any) => {
                  setFieldValue("artist", e.target.value),
                    generateName(e.target.value, values.passType, setFieldValue)
                }}
              >
                <option value="">-</option>
                {artists.length &&
                  artists.map((item: any, index: number) => (
                    <option key={"artist-item" + index} value={item.id}>
                      {item.attributes.name}
                    </option>
                  ))}
              </Field>
            </label>
            <label>
              <span>Collection size</span>
              {errors.size && touched.size ? (
                <div className="alert">{errors.size}</div>
              ) : null}
              <Field type="number" name="size" max="500" />
            </label>
            <label>
              <span>Pass Type</span>
              {errors.passType && touched.passType ? (
                <div className="alert">{errors.passType}</div>
              ) : null}
              <Field
                name="passType"
                as="select"
                onChange={(e: any) => {
                  setFieldValue("passType", e.target.value),
                    generateName(values.artist, e.target.value, setFieldValue)
                }}
              >
                <option value="">-</option>
                <option value="Lifetime">Lifetime</option>
                <option value="Lottery">Lottery</option>
                <option value="Tour">Tour</option>
                <option value="Single Event">Single Event</option>
              </Field>
            </label>
            {values.passType == "Lottery" && (
              <label>
                <span>How many winners per lottery?</span>
                <Field type="number" name="winners" />
              </label>
            )}
            <label>
              <span>Sale Type</span>
              {errors.saleType && touched.saleType ? (
                <div className="alert">{errors.saleType}</div>
              ) : null}
              <Field name="saleType" as="select">
                <option value="">-</option>
                <option value="Auction">Auction</option>
                <option value="Fixed">Fixed Price</option>
              </Field>
            </label>
            <label>
              <span>Drop date</span>
              {errors.dropDate && touched.dropDate ? (
                <div className="alert">{errors.dropDate}</div>
              ) : null}
              <DatePicker
                showTimeSelect
                dateFormat="Pp"
                name="dropDate"
                selected={values.dropDate}
                onChange={(dropDate) => setFieldValue("dropDate", dropDate)}
              />
            </label>
            {values.passType == "Single Event" && (
              <label>
                <span>Show</span>
                <Field name="show" as="select">
                  <option value="">-</option>
                </Field>
              </label>
            )}
            {values.passType == "Tour" && (
              <>
                <label>
                  <span>Tour start date</span>
                  {errors.tourFrom && touched.tourFrom ? (
                    <div className="alert">{errors.tourFrom}</div>
                  ) : null}
                  <DatePicker
                    showTimeSelect
                    dateFormat="Pp"
                    name="tourFrom"
                    selected={values.tourFrom}
                    onChange={(tourFrom) => setFieldValue("tourFrom", tourFrom)}
                  />
                </label>

                <label>
                  <span>Tour end date</span>
                  {errors.tourTo && touched.tourTo ? (
                    <div className="alert">{errors.tourTo}</div>
                  ) : null}
                  <DatePicker
                    showTimeSelect
                    dateFormat="Pp"
                    name="tourTo"
                    selected={values.tourTo}
                    onChange={(tourTo) => setFieldValue("tourTo", tourTo)}
                  />
                </label>
              </>
            )}
            <label>
              {values.saleType == "Auction" ? (
                <span>Initial auction price (ETH)</span>
              ) : (
                <span>Fixed price (ETH)</span>
              )}
              {errors.price && touched.price ? (
                <div className="alert">{errors.price}</div>
              ) : null}
              <Field type="number" name="price" />
            </label>
            {values.saleType == "Auction" && (
              <label>
                <span>Duration (Hours)</span>
                <Field name="duration" type="text" />
              </label>
            )}
            <label className="full">
              <span>Royalty Wallet Address</span>
              {errors.wallet && touched.wallet ? (
                <div className="alert">{errors.wallet}</div>
              ) : null}
              <Field type="text" name="wallet" />
              <div className="description">
                {!isConnected && (
                  <span>
                    <span className="connect" onClick={() => connect()}>
                      Connect your wallet
                    </span>{" "}
                    to auto-fill the address, or carefully type it.
                  </span>
                )}
                {isConnected && (
                  <span
                    className="connect"
                    onClick={() => setFieldValue("wallet", address)}
                  >
                    Auto-fill using my connected wallet.
                  </span>
                )}
              </div>
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
