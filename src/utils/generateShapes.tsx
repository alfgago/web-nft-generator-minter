import { fabric } from "fabric"

const generateShapes = (size: any, canvasWidth: any, availableShapes: any) => {
  const shapesArray = []
  const min = Math.ceil(0)
  const max = Math.floor(360)
  const cellSize = canvasWidth / size

  for (let i = 0; i < size; i++) {
    const leftPosition = -(canvasWidth / 2) + i * cellSize
    for (let j = 0; j < size; j++) {
      const shapeType =
        availableShapes[Math.floor(Math.random() * availableShapes.length)]
      const topPosition = -(canvasWidth / 2) + j * cellSize
      const angle = Math.floor(Math.random() * (max - min) + min)
      let shape = null
      if (shapeType == 1) {
        shape = new fabric.Circle({
          left: leftPosition,
          top: topPosition,
          radius: cellSize / 2,
          fill: "#444",
        })
      } else if (shapeType == 2) {
        shape = createTriangle(leftPosition, topPosition, cellSize * 0.9, angle)
      } else if (shapeType == 3) {
        shape = new fabric.Rect({
          left: leftPosition,
          top: topPosition,
          width: cellSize * 0.9,
          height: cellSize,
          fill: "#444",
        })
        shape.rotate(angle)
      }
      shapesArray.push(shape)
    }
  }

  return shapesArray
}

const createTriangle = (
  x: number,
  y: number,
  cellSize: number,
  angle: number
) => {
  const pos = fabric.util.rotatePoint(
    new fabric.Point(x, y),
    new fabric.Point(x + cellSize / 2, y + (cellSize / 3) * 2),
    fabric.util.degreesToRadians(angle)
  )
  return new fabric.Triangle({
    width: cellSize,
    height: cellSize,
    fill: "#444",
    left: pos.x,
    top: pos.y,
    angle: angle,
  })
}

export default generateShapes
