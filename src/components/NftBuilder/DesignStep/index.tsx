/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { useEffect, useState } from "react"
import React from "react"
import { fabric } from "fabric"
import Slider from "react-input-slider"

import { CommonPill } from "@/components/Common/CommonStyles"
import generateShapes from "@/utils/generateShapes"

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
    canvas: any
    template: any
    layers: any
  }
}

const DesignStep = ({ previousAction, nextAction, artist, nftName }: any) => {
  const [initialized, setInitialized] = useState(false)
  const [activeSetting, setActiveSetting] = useState("Template")
  const [backgroundColor, setBackgroundColor] = useState({ hex: "#000" })
  const [shapesColor, setShapesColor] = useState({ hex: "#000" })
  const [imageUrl, setImageUrl] = useState("")
  const [gridSize, setGridSize] = useState(2)
  const [gutter, setGutter] = useState(50)
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
        imageUrl: imageUrl,
        gridSize: gridSize,
      })
    )

    sessionStorage.setItem("canvasJson", JSON.stringify(window.canvas.toJSON()))
    nextAction()
  }

  useEffect(() => {
    initCanvas()
  }, [])

  useEffect(() => {
    if (initialized) {
      pickTemplate(activeTemplate)
    }
  }, [activeTemplate, gutter])

  useEffect(() => {
    if (initialized) {
      pickBackground(backgroundColor.hex)
    }
  }, [backgroundColor, shapesColor, shapes, gutter])

  useEffect(() => {
    if (initialized) {
      changeImage(imageUrl)
    }
  }, [imageUrl])

  const initCanvas = () => {
    if (!window.layers) {
      window.layers = []
    }
    // FabricJS creates the .canvas-container, so if it exists, don't do this again
    if (!document.body.querySelector(".canvas-container")) {
      if (window.canvas) {
        const json = window.canvas.toJSON()
        const canvas = new fabric.Canvas("canvas")
        canvas.loadFromJSON(json, () => {
          window.canvas.getObjects().forEach(function (el: any) {
            let isSelectable = true
            if (el.get("type") == "image") {
              if (
                el._originalElement &&
                el._originalElement.currentSrc.includes("/templates/")
              ) {
                window.layers[3] = el
                isSelectable = false
              }
              if (
                el._originalElement &&
                el._originalElement.currentSrc.includes("blob")
              ) {
                window.layers[1] = el
              }
            }
            if (el.get("type") == "rect") {
              isSelectable = false
            }
            if (el.get("type") == "textbox") {
              window.layers[4] = el
              isSelectable = false
            }
            if (!isSelectable) {
              el.set("selectable", false)
              el.set("evented", false)
            }
          })
          canvas.renderAll()
        })
        // window.canvas.remove(window.canvas.getObjects()[0]) // Remove texture
        window.canvas = canvas
      } else {
        window.canvas = new fabric.Canvas("canvas")
        pickTemplate()
        pickBackground("#000")

        try {
          const artistImage = artist.attributes.banner.data.attributes.url
          setImageUrl(artistImage)
        } catch (e) {
          console.log(e)
        }
      }
      window.canvas.preserveObjectStacking = true
      setInitialized(true)
    }
  }

  // Need to clean code
  const pickTemplate = (number = 0) => {
    if (window.canvas && window.layers[3]) {
      window.canvas.remove(window.layers[3])
    }
    const gutterDist = canvasWidth - gutter
    number = number + 1
    let hasTop = false
    let hasLeft = false
    let hasRight = false
    let hasBottom = false
    if (number == 1) {
      hasBottom = true
    }
    if (number == 2) {
      hasLeft = true
    }
    if (number == 3) {
      hasTop = true
    }
    if (number == 4) {
      hasTop = true
      hasLeft = true
      hasRight = true
      hasBottom = true
    }

    const templateGroup = new fabric.Group(
      [
        new fabric.Rect({
          width: canvasWidth,
          height: gutter,
          top: 0,
          left: 0,
          fill: hasTop ? backgroundColor.hex : "",
        }),
        new fabric.Rect({
          width: canvasWidth,
          height: gutter,
          top: gutterDist,
          left: 0,
          fill: hasBottom ? backgroundColor.hex : "",
        }),
        new fabric.Rect({
          width: gutter,
          height: canvasHeight,
          top: 0,
          left: 0,
          fill: hasLeft ? backgroundColor.hex : "",
        }),
        new fabric.Rect({
          width: gutter,
          height: canvasHeight,
          top: 0,
          left: gutterDist,
          fill: hasRight ? backgroundColor.hex : "",
        }),
      ],
      {
        width: canvasWidth,
        height: canvasHeight,
        top: 0,
        left: 0,
      }
    )
    window.canvas.add(templateGroup)
    templateGroup.set("selectable", false)
    templateGroup.set("evented", false)
    window.layers[3] = templateGroup // Template is the 3rd layer
    addText()
  }

  const changeImage = (imageUrl: any) => {
    window.canvas.getObjects().forEach(function (el: any) {
      if (el.get("type") == "image") {
        if (
          el._originalElement &&
          !el._originalElement.currentSrc.includes("/templates/")
        ) {
          window.canvas.remove(el)
        }
      }
    })

    fabric.Image.fromURL(
      imageUrl,
      function (oImg) {
        oImg.scaleToWidth(canvasWidth)
        window.canvas.add(oImg)
        window.layers[1] = oImg // Uploaded image is always the 1st layer
        reorderCanvas()
      },
      { crossOrigin: "anonymous" }
    )
  }

  const pickBackground = (color: string) => {
    // Remove old BG
    window.canvas.getObjects().forEach(function (el: any) {
      if (el.get("type") == "rect") {
        window.canvas.remove(el)
      }
    })

    const clipBackground = new fabric.Rect({
      width: canvasWidth,
      height: canvasHeight,
      top: 0,
      left: 0,
      fill: color,
    })

    if (gridSize > 0 && availableShapes.length > 0) {
      const clipPath = new fabric.Group(shapes, {
        inverted: true,
      })
      clipBackground.clipPath = clipPath
    }
    /*
    clipBackground.top = gutter
    clipBackground.left = gutter
    clipBackground.scaleToWidth(canvasWidth - gutter * 2)
    */

    clipBackground.set("selectable", false)
    clipBackground.set("evented", false)
    window.canvas.add(clipBackground)
    window.layers[2] = clipBackground // Clip is the 2nd layer

    addShapesColors()
    reorderCanvas()
  }

  const addShapesColors = () => {
    const shapesColorsRect = new fabric.Rect({
      width: canvasWidth,
      height: canvasHeight,
      top: 0,
      left: 0,
      fill: shapesColor.hex,
    })
    shapesColorsRect.set("selectable", false)
    shapesColorsRect.set("evented", false)
    window.canvas.add(shapesColorsRect)
    window.layers[0] = shapesColorsRect // This is the background, first layer
  }

  const addText = () => {
    window.canvas.getObjects().forEach(function (el: any) {
      if (el.get("type") == "textbox") {
        window.canvas.remove(el)
      }
    })
    const gutterDist = canvasWidth - gutter
    const templates = [
      { number: 1, textX: 0, textY: gutterDist + 9, textRotate: 0 },
      { number: 2, textX: gutter / 2 - 9, textY: canvasWidth, textRotate: -90 },
      { number: 3, textX: 0, textY: gutter / 2 - 9, textRotate: 0 },
      { number: 4, textX: 0, textY: gutter / 2 - 9, textRotate: 0 },
    ]
    const template = templates[activeTemplate]
    const nftText = nftName

    const text = new fabric.Textbox(nftText, {
      top: template.textY,
      left: template.textX,
      angle: template.textRotate,
      width: 600,
      height: gutter,
      fill: "#FFF",
      fontSize: 18,
      lineHeight: 1.1,
      fontFamily: "Trap",
      textAlign: "center",
      centeredRotation: true,
    })
    window.canvas.add(text)

    text.set("selectable", false)
    text.set("evented", false)
    window.layers[4] = text // Text is 4th layer
    reorderCanvas()
  }

  const reorderCanvas = () => {
    window.layers.forEach((element: any, index: number) => {
      if (element) {
        element.moveTo(index)
      }
    })
    window.layers[4].bringToFront()
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

const encodeSvg = (svgString: any) => {
  return svgString
    .replace(
      "<svg",
      ~svgString.indexOf("xmlns")
        ? "<svg"
        : '<svg xmlns="http://www.w3.org/2000/svg"'
    )
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")

    .replace(/\s+/g, " ")
}
