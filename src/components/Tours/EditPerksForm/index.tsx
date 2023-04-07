/* eslint-disable no-else-return */
// @ts-nocheck
import React, { useEffect, useState } from "react"
import axios from "axios"
import feather from "feather-icons"
import { Field, FieldArray, Form, Formik } from "formik"
import { ReactSVG } from "react-svg"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"

import { EditPerksFormStyles } from "./EditPerksFormStyles"

interface Perk {
  icon: string
  text: string
  link: string
}

interface FormValues {
  perks: Perk[]
}

const initialValues = {
  perks: [{ icon: "", text: "", link: "" }],
}

const EditPerksForm = ({ item }: any) => {
  console.log(item)

  const valuesSchema = Yup.object().shape({
    perks: Yup.array().of(
      Yup.object().shape({
        icon: Yup.string().required("Icon is required"),
        text: Yup.string().required("Text is required"),
        link: Yup.string()
          .required("Link is required")
          .url("Link must be a valid URL starting with 'https://'"),
      })
    ),
  })

  async function updatePassPerks(values: any) {
    const response = await axios.patch("/api/pass/update-perks", {
      id: item.id,
      perks: values.perks,
    })
    return response
  }

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    setSubmitting(true)
    updatePassPerks({ ...values })
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        // Show an error message
        alert(
          "An error occurred adding the event. Please contact us if this is a repeated issue."
        )
        console.log(error)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <EditPerksFormStyles className="content">
      <div>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={valuesSchema}
          >
            {({ isSubmitting, errors, touched, values, setFieldValue }) => (
              <div className="in-popup">
                {!isSubmitting ? (
                  <>
                    <Form className="cols-2">
                      <label className="full perks-title">
                        <span>Perks</span>
                      </label>
                      <div className="perks-container">
                        <FieldArray
                          name="perks"
                          render={(arrayHelpers) => (
                            <div>
                              {values.perks.map((perk: Perk, index: number) => (
                                <div key={index} className="perk-item">
                                  <label className="icon-label">
                                    <span>Icon</span>
                                    <div className="icon-field">
                                      <Field
                                        as="select"
                                        name={`perks.${index}.icon`}
                                      >
                                        <option value="">
                                          - Select an icon -
                                        </option>
                                        {Object.keys(feather.icons).map(
                                          (iconName, index) => (
                                            <option
                                              key={index}
                                              value={iconName}
                                            >
                                              {iconName}
                                            </option>
                                          )
                                        )}
                                      </Field>
                                      <span
                                        className="selected-icon"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            feather?.icons[perk.icon]?.toSvg(),
                                        }}
                                      />
                                    </div>
                                    {errors.perks &&
                                    errors.perks[index] &&
                                    touched.perks &&
                                    touched.perks[index] &&
                                    errors.perks[index].icon ? (
                                      <div className="alert">
                                        {errors.perks[index].icon}
                                      </div>
                                    ) : null}
                                  </label>
                                  <label>
                                    <span>Text</span>
                                    <Field
                                      name={`perks.${index}.text`}
                                      as="textarea"
                                      rows={3}
                                      placeholder="Perk text"
                                    />
                                    {errors.perks &&
                                    errors.perks[index] &&
                                    touched.perks &&
                                    touched.perks[index] &&
                                    errors.perks[index].text ? (
                                      <div className="alert">
                                        {errors.perks[index].text}
                                      </div>
                                    ) : null}
                                  </label>
                                  <label>
                                    <span>Link</span>
                                    <Field
                                      name={`perks.${index}.link`}
                                      type="text"
                                      placeholder="https://"
                                    />
                                    {errors.perks &&
                                    errors.perks[index] &&
                                    touched.perks &&
                                    touched.perks[index] &&
                                    errors.perks[index].link ? (
                                      <div className="alert">
                                        {errors.perks[index].link}
                                      </div>
                                    ) : null}
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Remove Perk
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() =>
                                  arrayHelpers.push({
                                    icon: "",
                                    text: "",
                                    link: "",
                                  })
                                }
                              >
                                Add Perk
                              </button>
                            </div>
                          )}
                        />
                      </div>
                      <div className="buttons">
                        <button type="submit">
                          <CommonPill className="clickable">Confirm</CommonPill>
                        </button>
                      </div>
                    </Form>
                  </>
                ) : (
                  <div className="success">
                    <ReactSVG src="/assets/icons/check-circle.svg" />
                    Perks edited successfully
                  </div>
                )}
              </div>
            )}
          </Formik>
        </div>
      </div>
    </EditPerksFormStyles>
  )
}

export default EditPerksForm
