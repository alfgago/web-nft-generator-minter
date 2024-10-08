/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
import { useState } from "react"
import cleanUrl from "@/utils/cleanUrl"
import axios from "axios"
import dateFormat from "@/utils/dateFunctions"

import { CommonPill } from "@/components/Common/CommonStyles"
import Link from "next/link"

import { ConfirmationStepStyles } from "./ConfirmationStepStyles"
import PassPreview from "@/components/PassPreview"

const ConfirmationSingle = ({
  formValues,
  imageUrl = "",
  nftName,
  selectedShow,
  previousAction,
  nextAction,
  uploading,
  uploaded = 0,
  contractAddress,
  contractDeployed,
  errorMessage,
  setErrorMessage,
  setUploading,
}) => {
  const [previewImages, setPreviewImages] = useState([])
  const [render, setRender] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingBlockchain, setUploadingBlockchain] = useState(0)

  const postImage = async (data) => {
    try {
      const apiURL =
        process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
      const token = process.env.NEXT_PUBLIC_API_TOKEN_LIMITED

      const response = await axios.post(
        `${apiURL}/api/generate-pass-image`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // const response = await axios.post("/api/generate-pass-image", data)
      return response.data
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const onClickGenerate = () => {
    setRender(false)
    setLoading(true)
    bulkCanvasImages()
    setTimeout(function () {
      setLoading(false)
    }, 2000)
  }

  const bulkCanvasImages = async () => {
    const collection = []
    for (let i = 0; i < formValues.size; i++) {
      collection.push(i)
    }
    setPreviewImages(collection)
    setRender(true)
  }

  const doSubmit = async () => {
    setUploading(true)
    const imges = []

    for (let i = 0; i < previewImages.length; i++) {
      const data = {
        previewUrl: cleanUrl(imageUrl),
        template: "template-1",
        name: selectedShow.attributes.name,
        city: selectedShow.attributes.city,
        country: selectedShow.attributes.country,
        date: dateFormat(selectedShow.attributes.date),
        number: i + 1,
        passTitle: nftName,
      }
      const url = await postImage(data)
      imges.push(url)
      setUploadingBlockchain(i + 1)
    }
    nextAction(imges)
  }

  const showError = errorMessage && errorMessage.length > 1

  return (
    <ConfirmationStepStyles>
      <h2>Confirm Collection Data</h2>

      <h3>Metadata</h3>
      <div className="form-confirm">
        <label>
          <strong>Collection name</strong>
          <span>{formValues.name}</span>
        </label>
        <label className="wallet">
          <strong>Royalty Wallet Address</strong>
          <span>{formValues.wallet}</span>
        </label>
        <label>
          <strong>Collection Size</strong>
          <span>{formValues.size}</span>
        </label>
        <label>
          <strong>Pass Type</strong>
          <span>{formValues.passType}</span>
        </label>
        <label>
          <strong>Sale Type</strong>
          <span>{formValues.saleType}</span>
        </label>
        <label>
          <strong>Price</strong>
          <span>{formValues.price} MATIC</span>
        </label>
      </div>

      <h3>Preview NFTs</h3>

      <div className="actions">
        <div className="repeat-canvs">
          <PassPreview
            previewUrl={imageUrl}
            name={selectedShow.attributes.name}
            city={selectedShow.attributes.city}
            country={selectedShow.attributes.country}
            date={selectedShow.attributes.date}
            customClass="generator"
          />
        </div>
      </div>
      {!loading && render ? (
        <div className="preview">
          {previewImages.map((img, index) => {
            return (
              <div key={index} className="nft">
                <PassPreview
                  previewUrl={imageUrl}
                  name={selectedShow.attributes.name}
                  city={selectedShow.attributes.city}
                  country={selectedShow.attributes.country}
                  date={selectedShow.attributes.date}
                  number={index + 1}
                  customClass="previews"
                />
              </div>
            )
          })}
        </div>
      ) : (
        ""
      )}

      {loading && (
        <img src="/assets/img/spinner.svg" className="spinner" alt="loader" />
      )}

      {uploading && !errorMessage ? (
        <div className="collection-minting">
          <div>
            Your collection is being minted, this may take a few minutes. Please
            do not close this window...
            <div className="uploaded">
              {uploadingBlockchain} / {previewImages.length}
            </div>
            {uploadingBlockchain ? (
              <div className="minting">Creating and publishing contract...</div>
            ) : (
              ""
            )}
            <img
              src="/assets/img/spinner.svg"
              className="spinner"
              alt="loader"
            />
          </div>
        </div>
      ) : (
        <>
          {!contractDeployed || errorMessage ? (
            <div className="buttons">
              <button onClick={() => previousAction()}>
                <CommonPill className="clickable">Previous</CommonPill>
              </button>
              <button onClick={() => onClickGenerate()}>
                <CommonPill className="clickable">Generate Previews</CommonPill>
              </button>
              {render && (
                <button onClick={() => doSubmit()}>
                  <CommonPill className="clickable fill">Confirm</CommonPill>
                </button>
              )}
            </div>
          ) : (
            <div className="deployment-success">
              Your blockchain passes contract has been deployed with Contract
              Address:{" "}
              <span className="contract-address">{contractAddress}</span>
              <div className="links">
                <Link href={"/pass/" + contractAddress}>
                  Check your collection here
                </Link>
              </div>
            </div>
          )}
          {showError && (
            <div className="contract-failed">
              The contract deployment has failed, please contact support team.{" "}
              {errorMessage}
            </div>
          )}
        </>
      )}
    </ConfirmationStepStyles>
  )
}

export default ConfirmationSingle
