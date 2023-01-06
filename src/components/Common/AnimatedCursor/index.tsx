// @ts-nocheck
import { useEffect } from "react"
import { useInterval } from "usehooks-ts"

import Cursor from "@/utils/AnimatedCursor/cursor"

import { AnimatedCursorStyles } from "./AnimatedCursorStyles"

const AnimatedCursor = () => {
  function initCursor() {
    window.customCursor = new Cursor(document.querySelector(".cursor"))
    window.customCursor.startTrack()
    recheckLinks()
  }

  function recheckLinks() {
    if (window.customCursor) {
      document.querySelectorAll("a, .clickable").forEach((el) => {
        if (!el.hasAttribute("hover-effect")) {
          el.addEventListener("mouseenter", () =>
            window.customCursor.emit("enter")
          )
          el.addEventListener("mouseleave", () =>
            window.customCursor.emit("leave")
          )
          el.setAttribute("hover-effect", "true")
        }
      })
    }
  }

  useEffect(() => {
    setTimeout(function () {
      initCursor()
    }, 1000)
  }, [])

  useInterval(() => {
    recheckLinks()
  }, 4000)

  return (
    <AnimatedCursorStyles>
      <svg className="cursor" width="220" height="220" viewBox="0 0 220 220">
        <defs>
          <filter
            id="filter-1"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0"
              numOctaves="1"
              result="warp"
            />
            <feOffset dx="-30" result="warpOffset" />
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="30"
              in="SourceGraphic"
              in2="warpOffset"
            />
          </filter>
        </defs>
        <circle className="cursor__inner" cx="110" cy="110" r="30" />
      </svg>
    </AnimatedCursorStyles>
  )
}

export default AnimatedCursor
