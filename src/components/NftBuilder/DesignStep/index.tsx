/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { useEffect, useState } from "react"
import { fabric } from "fabric"

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
const nftText = "NAME / DATE /PASS TYPE / TOUR"
const templates = [
  { number: 1, textX: 0, textY: 500, textRotate: 0 },
  { number: 2, textX: 25, textY: 600, textRotate: -90 },
  { number: 3, textX: 0, textY: 50, textRotate: 0 },
  { number: 4, textX: 0, textY: 25, textRotate: 0 },
]

declare global {
  interface Window {
    canvas: any
    template: any
    text: any
    addedImage: any
    shapesColor: any
  }
}

const DesignStep = ({ previousAction, nextAction, artist }: any) => {
  const [initialized, setInitialized] = useState(false)
  const [activeSetting, setActiveSetting] = useState("Template")
  const [activeTemplate, setActiveTemplate] = useState(templates[0])
  const [backgroundColor, setBackgroundColor] = useState({ hex: "#000" })
  const [shapesColor, setShapesColor] = useState({ hex: "#000" })
  const [imageUrl, setImageUrl] = useState("")
  const [gridSize, setGridSize] = useState(2)
  const [availableShapes, setAvailableShapes] = useState(["star", "roundstar"])

  const initialShapes = generateShapes(gridSize, canvasWidth, availableShapes)
  const [shapes, setShapes] = useState(initialShapes)

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
      pickTemplate(activeTemplate.number)
    }
  }, [activeTemplate])

  useEffect(() => {
    if (initialized) {
      pickBackground(backgroundColor.hex)
    }
  }, [backgroundColor, shapesColor, shapes])

  useEffect(() => {
    if (initialized) {
      changeImage(imageUrl)
    }
  }, [imageUrl])

  const initCanvas = () => {
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
                window.template = el
                isSelectable = false
              }
              if (
                el._originalElement &&
                el._originalElement.currentSrc.includes("blob")
              ) {
                window.addedImage = el
              }
            }
            if (el.get("type") == "rect") {
              isSelectable = false
            }
            if (el.get("type") == "textbox") {
              window.text = el
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
          console.log(artist)
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

  const pickTemplate = (number = 1) => {
    // Remove old Template
    window.canvas.remove(window.template)
    fabric.Image.fromURL(
      `/assets/templates/${number}.png`,
      function (oImg) {
        // window.canvas.add(oImg
        window.canvas.insertAt(oImg, 1)

        oImg.scaleToWidth(canvasWidth)
        oImg.scaleToHeight(canvasHeight)
        oImg.set("selectable", false)
        oImg.set("evented", false)
        oImg.bringToFront()
        window.template = oImg
        addText()
      },
      { crossOrigin: "anonymous" }
    )
  }

  const changeImage = (imageUrl: any) => {
    window.canvas.getObjects().forEach(function (el: any) {
      if (el.get("type") == "image") {
        if (
          el._originalElement &&
          el._originalElement.currentSrc.includes("blob")
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
        window.template.bringToFront()
        window.text.bringToFront()
        window.addedImage = oImg
        window.addedImage.sendToBack()
        if (window.shapesColor) {
          window.shapesColor.sendToBack()
        }
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

    const backgroundRect = new fabric.Rect({
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
      backgroundRect.clipPath = clipPath
    }
    /*
    const gutter = 30
    backgroundRect.top = gutter
    backgroundRect.left = gutter
    backgroundRect.scaleToWidth(canvasWidth - gutter * 2)
    */
    window.canvas.insertAt(backgroundRect, 0)
    backgroundRect.set("selectable", false)
    backgroundRect.set("evented", false)
    if (window.addedImage && gridSize && availableShapes.length > 0)
      window.addedImage.sendToBack()

    addShapesColors()
  }

  const addShapesColors = () => {
    const shapesColorsRect = new fabric.Rect({
      width: canvasWidth,
      height: canvasHeight,
      top: 0,
      left: 0,
      fill: shapesColor.hex,
    })
    window.canvas.add(shapesColorsRect)
    shapesColorsRect.sendToBack()
    window.shapesColor = shapesColorsRect
  }

  const addText = () => {
    window.canvas.getObjects().forEach(function (el: any) {
      if (el.get("type") == "textbox") {
        window.canvas.remove(el)
      }
    })

    const text = new fabric.Textbox(nftText, {
      top: activeTemplate.textY,
      left: activeTemplate.textX,
      angle: activeTemplate.textRotate,
      width: 600,
      fill: "#FFF",
      fontSize: 24,
      lineHeight: 1.1,
      fontFamily: "Trap",
      textAlign: "center",
      centeredRotation: true,
    })
    window.canvas.add(text)

    text.set("selectable", false)
    text.set("evented", false)
    text.bringToFront()
    window.text = text
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
          </div>
        </div>
        <div className="builder">
          <canvas id="canvas" width={canvasWidth} height={canvasHeight} />
        </div>
        <div className="tools">
          {activeSetting == "Template" && (
            <TemplatePicker
              templates={templates}
              activeTemplate={activeTemplate}
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
