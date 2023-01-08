/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { useEffect, useState } from "react"
import React from "react"
import { fabric } from "fabric"
import Slider from "react-input-slider"

import { CommonPill } from "@/components/Common/CommonStyles"
import generateShapes from "@/utils/generateShapes"
import s3url from "@/utils/s3url"
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
declare global {
  interface Window {
    templateFabric: any
    canvas: any
  }
}

const DesignStep = ({ previousAction, nextAction, artist, nftName }: any) => {
  const [templateFabric, setTemplateFabric] = useState<TemplateFabric | false>(
    false
  )
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

  const doNext = () => {
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
    nextAction()
  }

  useEffect(() => {
    initCanvas()
  }, [])

  useEffect(() => {
    if (templateFabric) {
      templateFabric.pickTemplate({
        canvasRef: window.canvas,
        activeTemplate,
        gutter,
        backgroundColor: backgroundColor,
      })
      templateFabric.pickBackground({
        canvasRef: window.canvas,
        gridSize,
        shapes,
        gutter,
        backgroundColor: backgroundColor,
        shapesColor,
        activeTemplate,
      })
      const nftText = nftName + " #"
      templateFabric.addText({
        canvasRef: window.canvas,
        activeTemplate,
        gutter,
        nftText,
      })
    }
  }, [activeTemplate, backgroundColor, shapesColor, shapes, gridSize, gutter])

  useEffect(() => {
    if (templateFabric) {
      let imgUrl = imageUrl
      if (!imageUrl.length) {
        imgUrl = artist.attributes.banner.data.attributes.url
          ? artist.attributes.banner.data.attributes.url
          : ""
        imgUrl = s3url(imgUrl)
      }
      templateFabric.changeImage({ canvasRef: window.canvas, imageUrl: imgUrl })
    }
  }, [imageUrl])

  const initCanvas = () => {
    // FabricJS creates the .canvas-container, so if it exists, don't do this again
    if (!document.body.querySelector(".canvas-container")) {
      let json = false
      if (window.canvas) {
        json = window.canvas.toJSON()
      }

      const artistImage = s3url(artist.attributes.banner.data.attributes.url)

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
            {settings.map((setting: string) => {
              return (
                <div
                  key={setting}
                  className={activeSetting == setting ? "active" : ""}
                  onClick={() => setActiveSetting(setting)}
                >
                  {setting}
                </div>
              )
            })}
            <div className="gutter-picker">
              <span>Border Width</span>
              <Slider
                axis="x"
                xmin={50}
                xmax={200}
                xstep={1}
                x={gutter}
                onChange={({ x }) => setGutter(x)}
              />
            </div>
          </div>
        </div>
        <div className="builder">
          <canvas id="canvas" width={canvasWidth} height={canvasHeight} />
        </div>
        <div className="tools">
          {activeSetting == "Template" && (
            <TemplatePicker
              activeTemplate={activeTemplate}
              gutter={gutter}
              setGutter={setGutter}
              setActiveTemplate={setActiveTemplate}
            />
          )}

          {activeSetting == "Grid" && (
            <GridPicker
              gridSize={gridSize}
              shapes={shapes}
              setShapes={setShapes}
              setGridSize={setGridSize}
              availableShapes={availableShapes}
            />
          )}

          {activeSetting == "Shapes" && (
            <ShapesPicker
              gridSize={gridSize}
              availableShapes={availableShapes}
              setShapes={setShapes}
              setAvailableShapes={setAvailableShapes}
            />
          )}

          {activeSetting == "Colors" && (
            <ColorsPicker
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              shapesColor={shapesColor}
              setShapesColor={setShapesColor}
            />
          )}

          {activeSetting == "Image" && (
            <ImagePicker setImageUrl={setImageUrl} />
          )}
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => previousAction()}>
          <CommonPill className="clickable">Previous</CommonPill>
        </button>
        <button onClick={() => doNext()}>
          <CommonPill className="clickable fill">Next</CommonPill>
        </button>
      </div>
    </DesignStepStyles>
  )
}

export default DesignStep
