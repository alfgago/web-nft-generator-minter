/* eslint-disable max-len */
import { useEffect, useState } from "react"
import { fabric } from "fabric"

import { CommonPill } from "@/components/Common/CommonStyles"
import generateShapes from "@/utils/generateShapes"

import { ConfirmationStepStyles } from "./ConfirmationStepStyles"

const canvasWidth = 600
const canvasHeight = 600

declare global {
  interface Window {
    previewCanvas: any
    collection: any
    previewLayers: any
  }
}

const ConfirmationStep = ({ formValues, previousAction, nextAction }: any) => {
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
    if (!window.previewLayers) {
      window.previewLayers = []
    }
    // FabricJS creates the .canvas-container, so if it exists, don't do this again
    if (!document.body.querySelector(".canvas-container")) {
      const canvasJson = sessionStorage.getItem("canvasJson")
      if (canvasJson) {
        const json = JSON.parse(canvasJson)
        const canvas = new fabric.Canvas("canvas")
        canvas.loadFromJSON(json, () => {
          canvas.getObjects().forEach(function (el: any) {
            if (el.get("type") == "image") {
              if (
                el._originalElement &&
                el._originalElement.currentSrc.includes("blob")
              ) {
                window.previewLayers[1] = el
              }
              if (
                el._originalElement &&
                el._originalElement.currentSrc.includes("/templates/")
              ) {
                window.previewLayers[3] = el
              }
            }

            if (el.get("type") == "textbox") {
              window.previewLayers[4] = el
            }
            el.set("selectable", false)
            el.set("evented", false)
          })
          canvas.preserveObjectStacking = true
          canvas.renderAll()
        })
        window.previewCanvas = canvas
      }

      setInitialized(true)
    }
  }

  const bulkCanvasImages = async () => {
    const collection = []
    const collectionData = sessionStorage.getItem("collectionData")
    if (collectionData) {
      const collectionDataJson = JSON.parse(collectionData)
      for (let i = 0; i < formValues.size; i++) {
        const image = generateCanvasImage(collectionDataJson)
        collection.push(image)
      }
    }

    // @ts-ignore
    setPreviewImages(collection)
    setRender(true)
  }

  const generateCanvasImage = (collectionData: any) => {
    pickBackground(collectionData)
    window.previewCanvas.renderAll()
    const nft = window.previewCanvas.toDataURL({
      format: "jpeg",
    })
    return nft
  }

  const pickBackground = (collectionData: any) => {
    const color = collectionData.backgroundColor.hex
    // Remove old BG
    window.previewCanvas.getObjects().forEach(function (el: any) {
      if (el.get("type") == "rect") {
        window.previewCanvas.remove(el)
      }
    })

    const backgroundRect = new fabric.Rect({
      width: canvasWidth,
      height: canvasHeight,
      top: 0,
      left: 0,
      fill: color,
    })

    const shapes = generateShapes(
      collectionData.gridSize,
      canvasWidth,
      collectionData.availableShapes
    )

    if (collectionData.gridSize > 0) {
      const clipPath = new fabric.Group(shapes, {
        inverted: true,
      })
      backgroundRect.clipPath = clipPath
    }
    window.previewCanvas.insertAt(backgroundRect, 2)
    backgroundRect.set("selectable", false)
    backgroundRect.set("evented", false)
    window.layers[2] = backgroundRect // Clip is the 2nd layer
    addShapesColors(collectionData)
  }

  const addShapesColors = (collectionData: any) => {
    const shapesColorsRect = new fabric.Rect({
      width: canvasWidth,
      height: canvasHeight,
      top: 0,

      left: 0,
      fill: collectionData.shapesColor.hex,
    })
    window.previewCanvas.add(shapesColorsRect)
    window.previewLayers[0] = shapesColorsRect // This is the background, first layer
    reorderCanvas()
  }

  const reorderCanvas = () => {
    window.previewLayers.forEach((element: any, index: number) => {
      if (element) {
        element.moveTo(index)
      }
    })
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
        <label>
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
          {previewImages.map((img: any, index: number) => {
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

      <div className="buttons">
        <button onClick={() => previousAction()}>
          <CommonPill className="clickable">Previous</CommonPill>
        </button>
        <button onClick={() => onClickGenerate()}>
          <CommonPill className="clickable">Generate Previews</CommonPill>
        </button>
        {render && (
          <button onClick={() => nextAction()}>
            <CommonPill className="clickable fill">Confirm</CommonPill>
          </button>
        )}
      </div>
    </ConfirmationStepStyles>
  )
}

export default ConfirmationStep
