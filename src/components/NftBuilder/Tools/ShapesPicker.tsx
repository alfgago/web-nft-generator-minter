import generateShapes from "@/utils/generateShapes"

const ShapesPicker = ({
  gridSize,
  availableShapes,
  setShapes,
  setAvailableShapes,
}: any) => {
  const possibleShapes = ["star", "diamond", "curve", "roundStar", "circle"]
  const canvasWidth = 600

  const onPickAvailableShapes = (shape: string) => {
    let newShapes = availableShapes
    if (availableShapes.includes(shape)) {
      newShapes = availableShapes.filter((item: string) => item !== shape)
    } else {
      newShapes.push(shape)
    }

    const shapesArray = generateShapes(gridSize, canvasWidth, newShapes)
    setAvailableShapes(newShapes)
    setShapes(shapesArray)
  }

  return (
    <div className="options shapes-options">
      {possibleShapes.map((shape: any, index: number) => {
        return (
          <div
            key={`shape-${index}`}
            className={availableShapes.includes(shape) ? "opt active" : "opt"}
          >
            <img
              src={`/assets/filters/${shape}.svg`}
              alt="shape"
              onClick={() => onPickAvailableShapes(shape)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ShapesPicker
