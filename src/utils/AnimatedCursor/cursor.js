/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventEmitter } from "events"
import { gsap } from "gsap"

import { calcWinsize, getMousePos, lerp, map } from "./utils"

// Track the mouse position
let mouse = { x: 0, y: 0 }

export default class Cursor extends EventEmitter {
  constructor(el) {
    super()
    this.DOM = { el: el }
    this.DOM.el.style.opacity = 0
    this.DOM.circleInner = this.DOM.el.querySelector(".cursor__inner")

    this.filterId = "#filter-1"
    this.DOM.feTurbulence = document.querySelector(
      `${this.filterId} > feTurbulence`
    )

    this.primitiveValues = { turbulence: 0 }

    this.createTimeline()

    this.bounds = this.DOM.el.getBoundingClientRect()

    this.renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.2 },
      ty: { previous: 0, current: 0, amt: 0.2 },
      radius: { previous: 30, current: 30, amt: 0.2 },
    }

    this.listen()

    this.onMouseMoveEv = () => {
      this.renderedStyles.tx.previous = this.renderedStyles.tx.current =
        mouse.x - this.bounds.width / 2
      this.renderedStyles.ty.previous = this.renderedStyles.ty.current =
        mouse.y - this.bounds.height / 2
      gsap.to(this.DOM.el, {
        duration: 0.9,
        ease: "Power3.easeOut",
        opacity: 1,
      })
      requestAnimationFrame(() => this.render())
      window.removeEventListener("mousemove", this.onMouseMoveEv)
    }
    window.addEventListener("mousemove", this.onMouseMoveEv)
  }
  startTrack() {
    window.addEventListener("mousemove", function (ev) {
      mouse = getMousePos(ev)
    })
  }
  render() {
    this.renderedStyles["tx"].current = mouse.x - this.bounds.width / 2
    this.renderedStyles["ty"].current = mouse.y - this.bounds.height / 2

    for (const key in this.renderedStyles) {
      this.renderedStyles[key].previous = lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        this.renderedStyles[key].amt
      )
    }

    this.DOM.el.style.transform = `translateX(${this.renderedStyles["tx"].previous}px) translateY(${this.renderedStyles["ty"].previous}px)`
    this.DOM.circleInner.setAttribute(
      "r",
      this.renderedStyles["radius"].previous
    )

    requestAnimationFrame(() => this.render())
  }
  createTimeline() {
    // init timeline
    this.tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          this.DOM.circleInner.style.filter = `url(${this.filterId}`
        },
        onUpdate: () => {
          this.DOM.feTurbulence.setAttribute(
            "baseFrequency",
            this.primitiveValues.turbulence
          )
        },
        onComplete: () => {
          this.DOM.circleInner.style.filter = "none"
        },
      })
      .to(this.primitiveValues, {
        duration: 0.4,
        startAt: { turbulence: 0.09 },
        turbulence: 0,
      })
  }
  enter() {
    this.renderedStyles["radius"].current = 60
    this.tl.restart()
  }
  leave() {
    this.renderedStyles["radius"].current = 30
    this.tl.progress(1).kill()
  }
  listen() {
    this.on("enter", () => this.enter())
    this.on("leave", () => this.leave())
  }
}
