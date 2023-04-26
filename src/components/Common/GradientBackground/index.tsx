/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-rest-params */
// @ts-nocheck
import { useEffect, useState } from "react"

import { Gradient } from "@/utils/GradientEffect/gradient"

import { GradientBackgroundStyles } from "./GradientBackgroundStyles"

const GradientBackground = ({
  className = "",
  hasGrain = true,
  customCanvas = "gradient-canvas",
}) => {
  const [initiated, setInitiated] = useState(false)

  let viewWidth
  let viewHeight
  let grainCanvas
  let ctx

  // change these settings
  const patternSize = 64
  const patternRefreshInterval = 8
  const patternAlpha = 25 // int between 0 and 255,

  const patternPixelDataLength = patternSize * patternSize * 4
  let patternCanvas
  let patternCtx
  let patternData
  let frame = 0

  // create a canvas which will render the grain
  function initCanvas() {
    viewWidth = grainCanvas.width = grainCanvas.clientWidth
    viewHeight = grainCanvas.height = grainCanvas.clientHeight
    ctx = grainCanvas.getContext("2d")
  }

  // create a canvas which will be used as a pattern
  function initGrain() {
    patternCanvas = document.createElement("canvas")
    patternCanvas.width = patternSize
    patternCanvas.height = patternSize
    patternCtx = patternCanvas.getContext("2d")
    patternData = patternCtx.createImageData(patternSize, patternSize)
  }

  // put a random shade of gray into every pixel of the pattern
  function update() {
    let value

    for (let i = 0; i < patternPixelDataLength; i += 4) {
      value = (Math.random() * 255) | 0

      patternData.data[i] = value
      patternData.data[i + 1] = value
      patternData.data[i + 2] = value
      patternData.data[i + 3] = patternAlpha
    }

    patternCtx.putImageData(patternData, 0, 0)
  }

  // fill the canvas using the pattern
  function draw() {
    ctx.clearRect(0, 0, viewWidth, viewHeight)

    ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat")
    ctx.fillRect(0, 0, viewWidth, viewHeight)
  }

  function loop() {
    if (++frame % patternRefreshInterval === 0) {
      update()
      draw()
    }
    window.grainLoop = requestAnimationFrame(loop)
  }

  useEffect(() => {
    if (window.gradient) {
      window.gradient.forceStop()
      cancelAnimationFrame(window.grainLoop)
    }
    setInitiated(true)
  }, [])

  useEffect(() => {
    if (initiated) {
      const colors = ["#FB00FB", "#1415FF", "#00ECFF"]

      window.gradient = new Gradient()
      window.gradient.colorSet = colors
      window.gradient.initGradient("#" + customCanvas)

      if (hasGrain) {
        setTimeout(function () {
          grainCanvas = document.getElementById("grain-canvas")
          initCanvas()
          initGrain()
          window.grainLoop = requestAnimationFrame(loop)
        }, 2000)
      }
    }
  }, [initiated])

  return (
    <GradientBackgroundStyles className={className} id="grad-container">
      <canvas id={customCanvas} data-transition-in />
      {hasGrain && (
        <canvas id="grain-canvas" className="active" data-transition-in />
      )}
    </GradientBackgroundStyles>
  )
}

export default GradientBackground
