import generateShapes from "@/utils/generateShapes"

const GridPicker = ({ shapes, gridSize, setShapes, setGridSize }: any) => {
  const gridSizes = [0, 2, 3, 4]
  const canvasWidth = 600
  const availableShapes = [
    1, // circle
    2, // triangle
    3, // square
  ]

  const onChangeGridSize = (size: any) => {
    const shapesArray = generateShapes(size, canvasWidth, availableShapes)

    setShapes(shapesArray)
    setGridSize(size)
  }

  return (
    <div className="options grid-options">
      {gridSizes.map((size: any, index: number) => {
        return (
          <img
            key={`size-${index}`}
            className={gridSize == size ? "opt active" : "opt"}
            src={`/assets/grids/${size}.svg`}
            alt="grid"
            onClick={() => onChangeGridSize(size)}
          />
        )
      })}
    </div>
  )
}

export default GridPicker
