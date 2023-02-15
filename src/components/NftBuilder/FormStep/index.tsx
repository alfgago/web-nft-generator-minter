/* eslint-disable max-len */
// @ts-nocheck
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import DatePicker from "react-datepicker"
import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"

import { FormStepStyles } from "./FormStepStyles"

import "react-datepicker/dist/react-datepicker.css"

const FormStep = ({
  formValues,
  nextAction,
  artists,
  nftTitle,
  nftDescription,
  setNftTitle,
  setNftDescription,
  setMemberImage,
  selectedArtist,
  setSelectedArtist,
  selectedShow,
  setSelectedShow,
}: any) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your project name"),
    dropDate: Yup.date().required("Please enter the mint date"),
    artist: Yup.string().required("Please enter the artist"),
    member: Yup.string().required("Please enter the member"),
    wallet: Yup.string().required("Please enter your wallet"),
    size: Yup.number()
      .when("saleType", {
        is: "Auction",
        then: Yup.number().max(
          10,
          "Size must be no bigger than 10 when using Auction type"
        ),
        otherwise: Yup.number().max(500, "Size must be no bigger than 500"),
      })
      .required("Please enter your collection size."),
    passType: Yup.string().required("Please enter your pass type"),
    saleType: Yup.string().required("Please enter your sale type"),
    price: Yup.number().required("Please enter your price"),
    charity_name: Yup.string().when("is_charity", {
      is: true,
      then: Yup.string().required("Charity name is required"),
    }),
    charity_royalty: Yup.number().when("is_charity", {
      is: true,
      then: Yup.number().required("Charity royalty is required").positive(),
    }),
  })
  const [members, setMembers] = useState([])

  useEffect(() => {
    if (selectedArtist) {
      setMembers(selectedArtist.attributes.members)
    }
  }, [selectedArtist])
  interface FormValues {
    name: string
    dropDate: Date
    wallet: string
    size: number
    winners: number
    passType: string
    saleType: string
    artist: number
    member: number
    show: number
    duration: number
    price: number
    tourFrom: Date
    tourTo: Date
    tourName: string
    lotteryDate: Date
    artistName: string
  }

  const formikRef = useRef(null) as any

  const submit = async (values: FormValues) => {
    nextAction(values)
  }

  const [shows, setShows] = useState([])
  const fetchShows = async (artistId) => {
    // @ts-ignore
    const res = await axios.get("/api/shows?artist=" + artistId)
    const artistShows = res.data.data
    setShows(artistShows)
  }

  const generateName = (artist: number, passType: string, show: number) => {
    let type = passType.charAt(0).toUpperCase() + passType.slice(1)
    let title = ""

    if (type == "Single Event") {
      const sel = shows.find((obj: any) => obj.id == show)
      if (sel) {
        setSelectedShow(sel)
        type = sel.attributes.name
      }
    }

    const sel = artists.find((obj: any) => obj.id == artist)
    if (sel) {
      setSelectedArtist(sel)
      formikRef.current.setFieldValue("artistName", sel.attributes.name)
      title = `${sel.attributes.name} ${type} Pass`
    }
    formikRef.current.setFieldValue("name", title)
    setNftTitle(title)
  }

  const selectArtist = (artistId: number) => {
    fetchShows(artistId)
    formikRef.current.setFieldValue("artist", artistId)

    window.canvas = false
    window.uploadedNfts = 0
    sessionStorage.removeItem("collectionData")
    sessionStorage.removeItem("canvasJson")

    generateName(
      artistId,
      formikRef.current.values.passType,
      formikRef.current.values.show
    )
  }

  const selectShow = (showId: number) => {
    formikRef.current.setFieldValue("show", showId)

    generateName(
      formikRef.current.values.artist,
      formikRef.current.values.passType,
      showId
    )
  }

  const selectPassType = (passType: any) => {
    formikRef.current.setFieldValue("passType", passType)
    if (passType == "Lottery") {
      formikRef.current.setFieldValue("saleType", "Fixed")
    }

    generateName(
      formikRef.current.values.artist,
      passType,
      formikRef.current.values.show
    )
  }

  const selectMember = (memberId: number) => {
    if (memberId) {
      const member = members.find((m: any) => m.id == memberId)
      const artistImg = selectedArtist.attributes.banner.data.attributes.url
        ? selectedArtist.attributes.banner.data.attributes.url
        : ""
      const image = member.nft_default_image.data?.attributes
        ? member.nft_default_image.data?.attributes.url
        : artistImg
      setMemberImage(image)

      formikRef.current.setFieldValue("member", memberId)
      formikRef.current.setFieldValue("memberName", member.name)

      window.canvas = false
      window.uploadedNfts = 0
      sessionStorage.removeItem("collectionData")
      sessionStorage.removeItem("canvasJson")
    }
  }

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  return (
    <FormStepStyles>
      <h2>Collection Data {nftTitle && <span> - {nftTitle}</span>}</h2>
      <Formik
        initialValues={formValues}
        onSubmit={submit}
        validationSchema={validationSchema}
        innerRef={formikRef}
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
              {errors.artist ? (
                <div className="alert">{errors.artist}</div>
              ) : null}
              <Field
                name="artist"
                as="select"
                onChange={(e: any) => {
                  selectArtist(e.target.value)
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
              <span>Band Member</span>
              {errors.member ? (
                <div className="alert">{errors.member}</div>
              ) : null}
              <Field
                name="member"
                as="select"
                onChange={(e: any) => {
                  selectMember(e.target.value)
                }}
              >
                <option value="">-</option>
                {members.length &&
                  members.map((item: any, index: number) => (
                    <option key={"member-item" + index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Field>
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
                  selectPassType(e.target.value)
                }}
              >
                <option value="">-</option>
                <option value="Lifetime">Lifetime</option>
                <option value="Lottery">Lottery</option>
                <option value="Tour">Tour</option>
                <option value="Single Event">Single Event</option>
              </Field>
            </label>
            <label>
              <span>Sale Type</span>
              {errors.saleType && touched.saleType ? (
                <div className="alert">{errors.saleType}</div>
              ) : null}
              <Field name="saleType" as="select">
                <option value="">-</option>
                <option value="Fixed">Fixed Price</option>
                {values.passType != "Lottery" && (
                  <option value="Auction">Auction</option>
                )}
              </Field>
            </label>
            <label>
              <span>Collection size</span>
              {errors.size && touched.size ? (
                <div className="alert">{errors.size}</div>
              ) : null}
              <Field type="number" name="size" max="500" />
            </label>
            {values.passType == "Lottery" && (
              <label>
                <span>How many winners per lottery?</span>
                <Field type="number" name="winners" />
              </label>
            )}
            <label>
              <span>Drop date</span>
              {errors.dropDate ? (
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
                <Field
                  name="show"
                  as="select"
                  onChange={(e: any) => {
                    selectShow(e.target.value)
                  }}
                >
                  <option value="">-</option>
                  {shows.length &&
                    shows.map((item: any, index: number) => (
                      <option key={"artist-item-" + index} value={item.id}>
                        {item.attributes.name}
                      </option>
                    ))}
                </Field>
              </label>
            )}
            {values.passType == "Tour" && (
              <>
                <label>
                  <span>Tour Name</span>
                  <Field name="tourName" />
                </label>
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
            <label className="custom-third-1">
              <span>Is Charity</span>
              <Field type="checkbox" name="is_charity" />
            </label>
            {values.is_charity && (
              <>
                <label className="custom-third">
                  <span>Charity Name</span>
                  <Field type="text" name="charity_name" />
                  {errors.charity_name && touched.charity_name ? (
                    <div className="alert">{errors.charity_name}</div>
                  ) : null}
                </label>
                <label className="custom-third">
                  <span>Charity Royalty</span>
                  <Field type="number" name="charity_royalty" />
                  {errors.charity_name && touched.charity_name ? (
                    <div className="alert">{errors.charity_name}</div>
                  ) : null}
                </label>
              </>
            )}

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
