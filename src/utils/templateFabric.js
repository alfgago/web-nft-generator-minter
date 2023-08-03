export default class TemplateFabric {
  layers

  constructor(canvasRef, json, shapes, artistImage, type = "full") {
    const layers = []
    window.fabric.Object.prototype.objectCaching = true
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
            } else {
              canvasRef.remove(el)
            }
          }
          if (el.get("type") == "group" && type == "single") {
            layers[2] = el
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
      this.layers = layers
      this.changeImage({ canvasRef, imageUrl: artistImage })
      if (type != "single") {
        this.pickTemplate({ canvasRef })
        this.pickBackground({ canvasRef, shapes })
      }
    }

    if (type == "single") {
      this.setSingleTemplate({ canvasRef })
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

    // Add 2px to widths as fix for white lines
    const templateGroup = new window.fabric.Group(
      [
        new window.fabric.Rect({
          width: canvasRef.width + 2,
          height: gutter + 2,
          top: 0,
          left: 0,
          fill: hasTop ? backgroundColor.hex : "",
        }),
        new window.fabric.Rect({
          width: canvasRef.width + 2,
          height: gutter + 3,
          top: gutterDist - 2,
          left: 0,
          fill: hasBottom ? backgroundColor.hex : "",
        }),
        new window.fabric.Rect({
          width: gutter + 3,
          height: canvasRef.height + 2,
          top: 0,
          left: 0,
          fill: hasLeft ? backgroundColor.hex : "",
        }),
        new window.fabric.Rect({
          width: gutter + 3,
          height: canvasRef.height + 2,
          top: 0,
          left: gutterDist - 2,
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

  setSingleTemplate = ({ canvasRef }) => {
    canvasRef.getObjects().forEach(function (el) {
      if (el.get("type") == "group") {
        canvasRef.remove(el)
      }
    })
    const self = this
    window.fabric.Image.fromURL(
      "https://plusonemusic.io/assets/img/single-pass-frame.png",
      function (oImg) {
        oImg.scaleToWidth(canvasRef.width)
        canvasRef.add(oImg)
        const templateGroup = new window.fabric.Group([oImg])
        canvasRef.add(templateGroup)
        self.layers[2] = templateGroup
        templateGroup.set("selectable", false)
        templateGroup.set("evented", false)
        oImg.set("selectable", false)
        oImg.set("evented", false)
        self.reorderCanvasSingle()
      },
      { crossOrigin: "anonymous" }
    )
  }

  addTextSingle = ({ canvasRef, nftText, date, venue, number }) => {
    canvasRef.getObjects().forEach(function (el) {
      if (el.get("type") == "textbox") {
        canvasRef.remove(el)
      }
    })

    const text = new window.fabric.Textbox(nftText, {
      top: 450,
      left: 125,
      width: 300,
      height: 500,
      fill: "#000",
      fontSize: 31,
      fontWeight: 800,
      lineHeight: 1.1,
      fontFamily: "Tickerbit",
      textAlign: "left",
    })
    canvasRef.add(text)

    const text2 = new window.fabric.Textbox(date, {
      top: 457,
      left: 425,
      width: 150,
      fill: "#fff",
      backgroundColor: "#000",
      fontSize: 23,
      lineHeight: 2,
      fontFamily: "Tickerbit",
      textAlign: "center",
    })
    canvasRef.add(text2)

    const text3 = new window.fabric.Textbox(venue, {
      top: 500,
      left: 125,
      width: 450,
      height: 500,
      fill: "#000",
      fontSize: 16,
      lineHeight: 1.1,
      fontFamily: "Tickerbit",
      textAlign: "left",
    })
    canvasRef.add(text3)

    const text4 = new window.fabric.Textbox(number, {
      top: 325,
      left: 485,
      width: 100,
      fill: "#fff",
      fontSize: 23,
      lineHeight: 1.1,
      fontFamily: "Tickerbit",
      textAlign: "center",
    })
    canvasRef.add(text4)

    text.set("selectable", false)
    text.set("evented", false)
    this.layers[3] = text // Text is 4th layer

    text2.set("selectable", false)
    text2.set("evented", false)
    this.layers[4] = text2 // Text is 4th layer

    text3.set("selectable", false)
    text3.set("evented", false)
    this.layers[5] = text3 // Text is 4th layer

    text4.set("selectable", false)
    text4.set("evented", false)
    this.layers[6] = text4 // Text is 4th layer
    this.reorderCanvasSingle()
  }

  changeImage = ({ canvasRef, imageUrl }) => {
    canvasRef.getObjects().forEach(function (el) {
      if (el.get("type") == "image") {
        canvasRef.remove(el)
      }
    })

    const self = this
    window.fabric.Image.fromURL(
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

    const clipBackground = new window.fabric.Rect({
      width: canvasRef.width + 2,
      height: canvasRef.height + 2,
      top: -1,
      left: -1,
      fill: backgroundColor.hex,
    })

    if (gridSize > 0 && shapes.length > 0) {
      const clipPath = new window.fabric.Group(shapes, {
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
    window.fabric.loadSVGFromURL(
      "/assets/img/short-logo.svg",
      function (objects, options) {
        const logo = window.fabric.util.groupSVGElements(objects, options)
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
    const shapesColorsRect = new window.fabric.Rect({
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
    const text = new window.fabric.Textbox(nftText, {
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

  reorderCanvasSingle = () => {
    this.layers.forEach((element, index) => {
      if (element) {
        element.moveTo(index)
      }
    })
    if (this.layers[3]) {
      this.layers[3].bringToFront()
    }
    if (this.layers[4]) {
      this.layers[4].bringToFront()
    }
    if (this.layers[5]) {
      this.layers[5].bringToFront()
    }
    if (this.layers[6]) {
      this.layers[6].bringToFront()
    }
  }
}
