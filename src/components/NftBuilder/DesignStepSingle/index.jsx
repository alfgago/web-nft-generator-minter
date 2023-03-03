/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { useEffect, useState } from "react"
import React from "react"
import { fabric } from "fabric-pure-browser"
import Slider from "react-input-slider"

import { CommonPill } from "@/components/Common/CommonStyles"
import generateShapes from "@/utils/generateShapes"
import cleanUrl from "@/utils/cleanUrl"
import TemplateFabric from "@/utils/templateFabric"

import ColorsPicker from "../Tools/ColorsPicker"
import GridPicker from "../Tools/GridPicker"
import ImagePicker from "../Tools/ImagePicker"
import ShapesPicker from "../Tools/ShapesPicker"
import TemplatePicker from "../Tools/TemplatePicker"

import { DesignStepStyles } from "./DesignStepStyles"

const canvasWidth = 600
const canvasHeight = 600
const settings = ["Template", "Grid", "Shapes", "Colors", "Image"]

const DesignStepSingle = ({
  previousAction,
  nextAction,
  artist,
  memberImage = "",
  nftName,
}) => {
  const [templateFabric, setTemplateFabric] = useState(false)
  const [activeSetting, setActiveSetting] = useState("Template")
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
        imageUrl: imageUrl,
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
      setGutter(collectionDataJson.gutter)
      setActiveTemplate(collectionDataJson.activeTemplate)
      setBackgroundColor(collectionDataJson.backgroundColor)
      setShapesColor(collectionDataJson.shapesColor)
      setImageUrl(collectionDataJson.imageUrl)
      setGridSize(collectionDataJson.gridSize)
    }

    initCanvas()
  }, [])

  useEffect(() => {
    if (templateFabric) {
      let imgUrl = imageUrl
      if (!imageUrl.length) {
        imgUrl = cleanUrl(memberImage)
      }
      templateFabric.changeImage({ canvasRef: window.canvas, imageUrl: imgUrl })
    }
  }, [imageUrl])

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
        artistImage
      )
      const nftText = nftName + " #"
      window.templateFabric.addText({
        canvasRef: window.canvas,
        activeTemplate,
        gutter,
        nftText,
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