/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { useEffect, useState } from "react"
import React from "react"
import { fabric } from "fabric-pure-browser"

import { CommonPill } from "@/components/Common/CommonStyles"
import generateShapes from "@/utils/generateShapes"
import cleanUrl from "@/utils/cleanUrl"
import TemplateFabric from "@/utils/templateFabric"
import ImagePicker from "../Tools/ImagePicker"

import { DesignStepStyles } from "./DesignStepStyles"

const canvasWidth = 600
const canvasHeight = 600

const DesignStepSingle = ({
  previousAction,
  nextAction,
  formValues,
  memberImage = "",
  nftName,
}) => {
  const [templateFabric, setTemplateFabric] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState({ hex: "#000" })
  const [shapesColor, setShapesColor] = useState({ hex: "#333" })
  const [imageUrl, setImageUrl] = useState("")
  const [gridSize, setGridSize] = useState(1)
  const [gutter, setGutter] = useState(60)
  const [availableShapes, setAvailableShapes] = useState(["star", "roundstar"])

  const initialShapes = generateShapes(gridSize, canvasWidth, availableShapes)
  const [shapes, setShapes] = useState(initialShapes)
  const [activeTemplate, setActiveTemplate] = useState(0)

  const saveSession = () => {
    sessionStorage.setItem(
      "collectionData",
      JSON.stringify({
        backgroundColor: backgroundColor,
        activeTemplate: activeTemplate,
        shapesColor: shapesColor,
        availableShapes: availableShapes,
        shapes: shapes,
        imageUrl: imageUrl || cleanUrl(memberImage),
        gridSize: gridSize,
        gutter: gutter,
      })
    )
    sessionStorage.setItem("canvasJson", JSON.stringify(window.canvas.toJSON()))
  }

  const doNext = () => {
    saveSession()
    nextAction()
  }

  const doPreviousAction = () => {
    saveSession()
    previousAction()
  }

  useEffect(() => {
    const collectionData = sessionStorage.getItem("collectionData")
    if (collectionData) {
      const collectionDataJson = JSON.parse(collectionData)
      setImageUrl(collectionDataJson.imageUrl)
    }

    initCanvas()
  }, [])

  const dateFormat = (value) => {
    const date = new Date(value)
    const month = date.toLocaleString("default", { month: "short" })
    const day = date.toLocaleString("default", { day: "numeric" })
    const year = date.toLocaleString("default", { year: "numeric" })
    return `${month} ${day} ${year}`
  }

  const initCanvas = () => {
    // FabricJS creates the .canvas-container, so if it exists, don't do this again
    if (!document.body.querySelector(".canvas-container")) {
      let json = sessionStorage.getItem("canvasJson")
      if (!json) {
        json = false
      }
      const artistImage = cleanUrl(memberImage)
      window.canvas = new fabric.Canvas("canvas")
      window.templateFabric = new TemplateFabric(
        window.canvas,
        json,
        shapes,
        artistImage,
        "single"
      )

      const nftText = formValues.artistName
      const date = dateFormat(formValues.dropDate)
      const venue = formValues.name
      const number = "#9999"
      window.templateFabric.addTextSingle({
        canvasRef: window.canvas,
        nftText,
        date,
        venue,
        number,
      })
      setTemplateFabric(window.templateFabric)
    }
  }

  return (
    <DesignStepStyles>
      <h2>Collection Template</h2>
      <div className="flex">
        <div className="left-col">
          <div className="settings trap">
            <h4>Change Image</h4>
            <ImagePicker setImageUrl={setImageUrl} />
          </div>
        </div>
        <div className="builder">
          <canvas id="canvas" width={canvasWidth} height={canvasHeight} />
        </div>
        <div className="tools" />
      </div>

      <div className="buttons">
        <button onClick={() => doPreviousAction()}>
          <CommonPill className="clickable">Previous</CommonPill>
        </button>
        <button onClick={() => doNext()}>
          <CommonPill className="clickable fill">Next</CommonPill>
        </button>
      </div>
    </DesignStepStyles>
  )
}

export default DesignStepSingle
