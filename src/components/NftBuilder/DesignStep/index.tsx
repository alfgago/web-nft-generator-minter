/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { useEffect, useState } from "react"
import { fabric } from "fabric"
import { SketchPicker } from "react-color"

import { CommonPill } from "@/components/Common/CommonStyles"

import { DesignStepStyles } from "./DesignStepStyles"

const settings = ["Template", "Background", "Grid", "Image"]
const templates = [1, 2, 3, 4]

declare global {
  interface Window {
    canvas: any
  }
}

const DesignStep = ({ previousAction, nextAction }: any) => {
  const [initialized, setInitialized] = useState(false)
  const [activeSetting, setActiveSetting] = useState("Template")
  const [activeTemplate, setActiveTemplate] = useState(1)

  useEffect(() => {
    initCanvas()
  }, [])

  useEffect(() => {
    if (initialized) {
      pickTemplate(activeTemplate)
    }
  }, [activeTemplate])

  const initCanvas = () => {
    // FabricJS creates the .canvas-container, so if it exists, don't do this again
    if (!document.body.querySelector(".canvas-container")) {
      if (window.canvas) {
        const json = window.canvas.toJSON()
        const canvas = new fabric.Canvas("canvas")
        canvas.loadFromJSON(json, () => {
          canvas.renderAll()
        })
        window.canvas.remove(window.canvas.getObjects()[0]) // Remove texture
        window.canvas = canvas
      } else {
        window.canvas = new fabric.Canvas("canvas")
        pickTemplate()
        pickBackground()
      }
      setInitialized(true)
    }
  }

  const pickTemplate = (number = 1) => {
    fabric.Image.fromURL(
      `/assets/templates/${number}.png`,
      function (oImg) {
        // Remove old Template
        window.canvas.remove(window.canvas.getObjects()[1])

        window.canvas.insertAt(oImg, 1)

        oImg.scaleToWidth(window.canvas.width)
        oImg.scaleToHeight(window.canvas.height)
        oImg.set("selectable", false)
        oImg.set("evented", false)
      },
      { crossOrigin: "anonymous" }
    )
  }

  const pickBackground = (color = "purple") => {
    // Remove old BG
    window.canvas.remove(window.canvas.getObjects()[0])

    const rect = new fabric.Rect({
      width: window.canvas.width,
      height: window.canvas.height,
      top: 0,
      left: 0,
      fill: color,
    })

    window.canvas.insertAt(rect, 0)

    rect.set("selectable", false)
    rect.set("evented", false)
    rect.sendToBack()
  }

  return (
    <DesignStepStyles>
      <h2>Collection Template</h2>
      <div className="flex">
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
        <div className="builder">
          <canvas id="canvas" width="600" height="600" />
        </div>
        <div className="tools">
          {activeSetting == "Template" && (
            <div className="options">
              {templates.map((template: number, index: number) => {
                return (
                  <img
                    key={`template${template}`}
                    className={
                      activeTemplate == template ? "opt active" : "opt"
                    }
                    src={`/assets/templates/mini${template}.png`}
                    alt="template"
                    onClick={() => setActiveTemplate(template)}
                  />
                )
              })}
            </div>
          )}

          {activeSetting == "Background" && (
            <div className="colors">
              <div onClick={() => pickBackground("red")}>red</div>
              <div onClick={() => pickBackground("purple")}>purple</div>
              <div onClick={() => pickBackground("orange")}>orange</div>
            </div>
          )}
        </div>
      </div>
      <div className="buttons">
        <button onClick={() => previousAction()}>
          <CommonPill className="clickable">Previous</CommonPill>
        </button>
        <button onClick={() => nextAction()}>
          <CommonPill className="clickable fill">Next</CommonPill>
        </button>
      </div>
    </DesignStepStyles>
  )
}

export default DesignStep
