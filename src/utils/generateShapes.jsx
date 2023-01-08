import { fabric } from "fabric-pure-browser"

const svgShapes = {
  diamond:
    "M342.76 7.01823L39.68 187.298C27.43 194.588 13.75 198.388 0 198.768V417.508H216.45C216.46 403.008 220.31 388.518 227.99 375.598L408.28 72.5282C433.62 29.9282 385.36 -18.3218 342.77 7.01823H342.76Z",
  star: "M428.59 203.31L295.98 169.62C284.66 166.74 275.82 157.9 272.94 146.58L239.25 13.98C234.52 -4.66 208.04 -4.66 203.31 13.98L169.62 146.59C166.74 157.91 157.9 166.75 146.58 169.63L13.98 203.31C-4.66 208.04 -4.66 234.52 13.98 239.25L146.59 272.94C157.91 275.82 166.75 284.66 169.63 295.98L203.32 428.59C208.05 447.23 234.53 447.23 239.26 428.59L272.95 295.98C275.83 284.66 284.67 275.82 295.99 272.94L428.6 239.25C447.24 234.52 447.24 208.04 428.6 203.31H428.59Z",
  curve:
    "M422.4 420.56V0.0399145C407.01 -0.670085 391.2 8.08991 386.53 26.4899L322.48 278.61C317.01 300.13 300.2 316.94 278.68 322.41L26.57 386.45C8.88 390.95 0.02 405.75 0 420.56H422.4Z",
  roundstar:
    "M452.92 163.52L425.5 156.56C401.4 150.44 382.59 131.62 376.46 107.52L369.49 80.1C342.36 -26.7 190.63 -26.7 163.5 80.1L156.54 107.52C150.42 131.62 131.6 150.43 107.5 156.56L80.0805 163.53C-26.7195 190.66 -26.7195 342.38 80.0805 369.52L107.5 376.49C131.6 382.61 150.41 401.43 156.54 425.53L163.51 452.95C190.64 559.75 342.36 559.75 369.5 452.95L376.47 425.53C382.59 401.43 401.41 382.62 425.51 376.49L452.93 369.53C559.73 342.4 559.73 190.68 452.93 163.54L452.92 163.52Z",
}

const generateShapes = (size, canvasWidth, availableShapes) => {
  const shapesArray = []
  let angles = [0, 45, 90, 135, 180, 225, 270, 315, 360]
  const min = Math.ceil(0)
  const max = Math.floor(360)
  const cellSize = canvasWidth / size

  if (!availableShapes.length) {
    return shapesArray
  }
  for (let i = 0; i < size; i++) {
    const leftPosition = -(canvasWidth / 2) + i * cellSize
    for (let j = 0; j < size; j++) {
      const shapeType =
        availableShapes[Math.floor(Math.random() * availableShapes.length)]
      const topPosition = -(canvasWidth / 2) + j * cellSize
      let shape = new fabric.Circle({
        left: leftPosition,
        top: topPosition,
        radius: cellSize / 2,
        fill: "#444",
      }) // default as circle
      let angle = 0
      if (shapeType == "star") {
        shape = new fabric.Path(svgShapes.star, {
          fill: "#333",
          opacity: 1,
          hasRotatingPoint: true,
          selectable: false,
          objectCaching: true,
        })
        angle = angles[Math.floor(Math.random() * angles.length)]
      } else if (shapeType == "diamond") {
        shape = new fabric.Path(svgShapes.diamond, {
          fill: "#333",
          opacity: 1,
          hasRotatingPoint: true,
          selectable: false,
          objectCaching: true,
        })
        angles = [0, 90, 180, 270]
        angle = angles[Math.floor(Math.random() * angles.length)]
      } else if (shapeType == "curve") {
        shape = new fabric.Path(svgShapes.curve, {
          fill: "#333",
          opacity: 1,
          hasRotatingPoint: true,
          selectable: false,
          objectCaching: true,
        })
        angles = [0, 90, 180, 270]
        angle = angles[Math.floor(Math.random() * angles.length)]
      } else if (shapeType == "roundstar") {
        shape = new fabric.Path(svgShapes.roundstar, {
          fill: "#333",
          opacity: 1,
          hasRotatingPoint: true,
          selectable: false,
          objectCaching: true,
        })
        angle = angles[Math.floor(Math.random() * angles.length)]
      }

      shape.left = leftPosition
      shape.top = topPosition
      shape.scaleToWidth(cellSize)
      shape.rotate(angle)
      shapesArray.push(shape)
    }
  }
  return shapesArray
}

export default generateShapes
