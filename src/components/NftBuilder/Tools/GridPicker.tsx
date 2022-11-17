import generateShapes from "@/utils/generateShapes"

const GridPicker = ({
  availableShapes,
  gridSize,
  setShapes,
  setGridSize,
}: any) => {
  const gridSizes = [1, 2, 3, 4]
  const canvasWidth = 600

  const onChangeGridSize = (size: any) => {
    const shapesArray = generateShapes(size, canvasWidth, availableShapes)

    setShapes(shapesArray)
    setGridSize(size)
  }

  return (
    <div className="options grid-options">
      {gridSizes.map((size: any, index: number) => {
        return (
          <div
            key={`size-${index}`}
            className={gridSize == size ? "opt active" : "opt"}
          >
            <img
              src={`/assets/grids/${size}.svg`}
              alt="grid"
              onClick={() => onChangeGridSize(size)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default GridPicker
