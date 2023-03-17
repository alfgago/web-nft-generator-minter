/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
import { useEffect, useState } from "react"
import { fabric } from "fabric-pure-browser"

import { CommonPill } from "@/components/Common/CommonStyles"
import generateShapes from "@/utils/generateShapes"
import TemplateFabric from "@/utils/templateFabric"
import Link from "next/link"

import { ConfirmationStepStyles } from "./ConfirmationStepStyles"

const canvasWidth = 600
const canvasHeight = 600

const ConfirmationSingle = ({
  formValues,
  previousAction,
  nextAction,
  uploading,
  uploaded = 0,
  contractAddress,
  contractDeployed,
  errorMessage,
}) => {
  const [previewImages, setPreviewImages] = useState([])
  const [render, setRender] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setTimeout(function () {
      initPreview()
    }, 500)
  }, [])

  const onClickGenerate = () => {
    setRender(false)
    setPreviewImages([])
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
    }, 2000)
    if (initialized) {
      bulkCanvasImages()
    }
  }

  const initPreview = () => {
    if (!document.body.querySelector(".canvas-container")) {
      const collectionData = sessionStorage.getItem("collectionData")
      if (collectionData) {
        const collectionDataJson = JSON.parse(collectionData)
        const json = sessionStorage.getItem("canvasJson")

        window.previewCanvas = new fabric.Canvas("canvas")
        window.previewFabric = new TemplateFabric(
          window.previewCanvas,
          json,
          null,
          null,
          "single"
        )

        const nftText = formValues.artistName
        const date = dateFormat(formValues.dropDate)
        const venue = formValues.name
        const number = "#9999"
        window.previewFabric.addTextSingle({
          canvasRef: window.canvas,
          nftText,
          date,
          venue,
          number,
        })

        setInitialized(true)
      }
    }
  }

  const bulkCanvasImages = async () => {
    const collection = []
    for (let i = 0; i < formValues.size; i++) {
      const image = generateCanvasImage(i)
      collection.push(image)
    }

    // @ts-ignore
    setPreviewImages(collection)
    setRender(true)
  }

  const dateFormat = (value) => {
    const date = new Date(value)
    const month = date.toLocaleString("default", { month: "short" })
    const day = date.toLocaleString("default", { day: "numeric" })
    const year = date.toLocaleString("default", { year: "numeric" })
    return `${month} ${day} ${year}`
  }

  const generateCanvasImage = (index) => {
    const nftText = formValues.artistName
    const date = dateFormat(formValues.dropDate)
    const venue = formValues.name
    const number = " #" + (index + 1)
    window.previewFabric.addTextSingle({
      canvasRef: window.canvas,
      nftText,
      date,
      venue,
      number,
    })

    window.previewCanvas.renderAll()
    const nft = window.previewCanvas.toDataURL({
      format: "jpeg",
    })
    return nft
  }

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
          <span>{formValues.price} ETH</span>
        </label>
      </div>

      <h3>Preview NFTs</h3>

      <div className="actions">
        <div className="repeat-canvs">
          <canvas id="canvas" width={canvasWidth} height={canvasHeight} />
        </div>
      </div>
      {!loading && render ? (
        <div className="preview">
          {previewImages.map((img, index) => {
            return (
              <div key={index} className="nft">
                <img src={img} alt="preview nft" />
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
              {uploaded} / {previewImages.length}
            </div>
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
                <button onClick={() => nextAction(previewImages)}>
                  <CommonPill className="clickable fill">Confirm</CommonPill>
                </button>
              )}
            </div>
          ) : (
            <div className="deployment-success">
              Your NFT passes contract has been deployed with Contract Address:{" "}
              <span className="contract-address">{contractAddress}</span>
              <div className="links">
                <Link href={"/pass/" + contractAddress}>
                  Check your collection here
                </Link>
              </div>
            </div>
          )}
          {errorMessage && (
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
