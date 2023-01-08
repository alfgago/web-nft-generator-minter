import { fabric } from "fabric-pure-browser"

export default class TemplateFabric {
  layers

  constructor(canvasRef, json, shapes, artistImage) {
    const layers = []
    fabric.Object.prototype.objectCaching = true
    if (json) {
      canvasRef.loadFromJSON(json, () => {
        canvasRef.getObjects().forEach(function (el) {
          let isSelectable = false
          if (el.get("type") == "image") {
            if (
              (el._originalElement &&
                el._originalElement.currentSrc.includes("blob")) ||
              el._originalElement.currentSrc.includes(
                "plusone-public.s3.amazonaws"
              ) ||
              el._originalElement.currentSrc.includes("/aws/")
            ) {
              layers[1] = el
              isSelectable = true
            }
          }
          if (el.get("type") == "textbox") {
            layers[4] = el
          }
          if (!isSelectable) {
            el.set("selectable", false)
            el.set("evented", false)
          }
        })
        canvasRef.renderAll()
      })
      this.layers = layers

      canvasRef.getObjects().forEach(function (el) {
        if (el.get("type") == "image") {
          canvasRef.remove(el)
        }
      })
    } else {
      canvasRef = canvasRef
      this.layers = layers
      this.changeImage({ canvasRef, imageUrl: artistImage })
      this.pickTemplate({ canvasRef })
      this.pickBackground({ canvasRef, shapes })
    }
    canvasRef.preserveObjectStacking = true
  }

  pickTemplate = ({
    canvasRef,
    activeTemplate = 0,
    gutter = 60,
    backgroundColor = { hex: "#000" },
  }) => {
    canvasRef.getObjects().forEach(function (el) {
      if (el.get("type") == "group") {
        canvasRef.remove(el)
      }
    })
    const gutterDist = canvasRef.width - gutter
    const number = activeTemplate + 1
    let hasTop = false
    let hasLeft = false
    let hasRight = false
    let hasBottom = false
    if (number == 1) {
      hasTop = true
      hasLeft = true
      hasRight = true
      hasBottom = true
    }
    if (number == 2) {
      hasLeft = true
    }
    if (number == 3) {
      hasTop = true
    }
    if (number == 4) {
      hasBottom = true
    }

    const templateGroup = new fabric.Group(
      [
        new fabric.Rect({
          width: canvasRef.width,
          height: gutter,
          top: 0,
          left: 0,
          fill: hasTop ? backgroundColor.hex : "",
        }),
        new fabric.Rect({
          width: canvasRef.width,
          height: gutter,
          top: gutterDist,
          left: 0,
          fill: hasBottom ? backgroundColor.hex : "",
        }),
        new fabric.Rect({
          width: gutter,
          height: canvasRef.height,
          top: 0,
          left: 0,
          fill: hasLeft ? backgroundColor.hex : "",
        }),
        new fabric.Rect({
          width: gutter,
          height: canvasRef.height,
          top: 0,
          left: gutterDist,
          fill: hasRight ? backgroundColor.hex : "",
        }),
      ],
      {
        width: canvasRef.width,
        height: canvasRef.height,
        top: 0,
        left: 0,
      }
    )

    templateGroup.set("selectable", false)
    templateGroup.set("evented", false)
    canvasRef.add(templateGroup)
    this.layers[3] = templateGroup // Template is the 3rd layer
  }

  changeImage = ({ canvasRef, imageUrl }) => {
    canvasRef.getObjects().forEach(function (el) {
      if (el.get("type") == "image") {
        canvasRef.remove(el)
      }
    })

    const self = this
    fabric.Image.fromURL(
      imageUrl,
      function (oImg) {
        oImg.scaleToWidth(canvasRef.width)
        canvasRef.add(oImg)
        self.layers[1] = oImg // Uploaded image is always the 1st layer
        self.reorderCanvas()
      },
      { crossOrigin: "anonymous" }
    )
  }

  pickBackground = ({
    canvasRef,
    gridSize = 1,
    shapes,
    gutter = 60,
    backgroundColor = { hex: "#000" },
    shapesColor = { hex: "#333" },
    activeTemplate = 0,
  }) => {
    // Remove old BG
    canvasRef.getObjects().forEach(function (el) {
      if (el.get("type") == "rect") {
        canvasRef.remove(el)
      }
    })

    const clipBackground = new fabric.Rect({
      width: canvasRef.width + 2,
      height: canvasRef.height + 2,
      top: -1,
      left: -1,
      fill: backgroundColor.hex,
    })

    if (gridSize > 0 && shapes.length > 0) {
      const clipPath = new fabric.Group(shapes, {
        inverted: true,
      })
      clipBackground.clipPath = clipPath
    }

    const number = activeTemplate + 1
    if (number == 1) {
      clipBackground.top = gutter - 1
      clipBackground.left = gutter - 1
      clipBackground.scaleToWidth(canvasRef.width - gutter * 2 + 2)
    }
    if (number == 2) {
      clipBackground.top = -1
      clipBackground.left = gutter - 1
    }
    if (number == 3) {
      clipBackground.top = gutter - 1
      clipBackground.left = -1
    }
    if (number == 4) {
      clipBackground.top = -gutter
      clipBackground.left = -1
    }

    clipBackground.set("selectable", false)
    clipBackground.set("evented", false)
    canvasRef.add(clipBackground)
    this.layers[2] = clipBackground // Clip is the 2nd layer

    this.addShapesColors({ canvasRef, shapesColor: shapesColor })

    // Adds the logo
    fabric.loadSVGFromURL(
      "/assets/img/short-logo.svg",
      function (objects, options) {
        const logo = fabric.util.groupSVGElements(objects, options)
        logo.scaleToWidth(100)
        let logoLeft = 0
        let logoTop = 0
        if (number == 1) {
          logoLeft = canvasRef.width / 2 - 50
        }
        if (number == 3) {
          logoTop = canvasRef.height - 65
        }
        logo.top = logoTop
        logo.left = logoLeft
        logo.selectable = false
        logo.evented = false
        canvasRef.add(logo)
      }
    )
  }

  addShapesColors = ({ canvasRef, shapesColor }) => {
    const shapesColorsRect = new fabric.Rect({
      width: canvasRef.width,
      height: canvasRef.height,
      top: 0,
      left: 0,
      fill: shapesColor.hex,
    })
    shapesColorsRect.set("selectable", false)
    shapesColorsRect.set("evented", false)
    canvasRef.add(shapesColorsRect)
    this.layers[0] = shapesColorsRect // This is the background, first layer
  }

  addText = ({ canvasRef, activeTemplate = 1, gutter = 60, nftText }) => {
    canvasRef.getObjects().forEach(function (el) {
      if (el.get("type") == "textbox") {
        canvasRef.remove(el)
      }
    })
    const gutterDist = canvasRef.width - gutter
    // Used to calculate text position on each template
    const templates = [
      {
        number: 1,
        textX: 0,
        textY: gutterDist + (gutter / 2 - 9),
        textRotate: 0,
      },
      {
        number: 2,
        textX: gutter / 2 - 9,
        textY: canvasRef.width,
        textRotate: -90,
      },
      { number: 3, textX: 0, textY: gutter / 2 - 9, textRotate: 0 },
      {
        number: 4,
        textX: 0,
        textY: gutterDist + (gutter / 2 - 9),
        textRotate: 0,
      },
    ]
    const template = templates[activeTemplate]
    const text = new fabric.Textbox(nftText, {
      top: template.textY,
      left: template.textX,
      angle: template.textRotate,
      width: 600,
      height: gutter,
      fill: "#FFF",
      fontSize: 21,
      lineHeight: 1.1,
      fontFamily: "Trap",
      textAlign: "center",
      centeredRotation: true,
    })
    canvasRef.add(text)

    text.set("selectable", false)
    text.set("evented", false)
    this.layers[4] = text // Text is 4th layer
    this.reorderCanvas()
  }

  reorderCanvas = () => {
    this.layers.forEach((element, index) => {
      if (element) {
        element.moveTo(index)
      }
    })
    if (this.layers[4]) {
      this.layers[4].bringToFront()
    }
  }
}
