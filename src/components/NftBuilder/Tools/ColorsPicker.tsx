import { SketchPicker } from "react-color"

const ColorsPicker = ({
  shapesColor,
  setShapesColor,
  backgroundColor,
  setBackgroundColor,
}: any) => {
  return (
    <div className="colors">
      <h3>Background Color</h3>
      <SketchPicker
        color={backgroundColor}
        onChange={(color) => setBackgroundColor(color)}
        disableAlpha={true}
      />
      <h3>Shapes Color</h3>
      <SketchPicker
        color={shapesColor}
        onChange={(color) => setShapesColor(color)}
        disableAlpha={true}
      />
    </div>
  )
}

export default ColorsPicker
