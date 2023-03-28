import React from "react"
import { ReactSVG } from "react-svg"

import { TooltipStyles } from "./TooltipStyles"
const Tooltip = ({ text }: any) => {
  return (
    <TooltipStyles>
      <ReactSVG
        className="icon"
        wrapper="span"
        src="/assets/icons/help-circle.svg"
      />
      <div className="text">{text}</div>
    </TooltipStyles>
  )
}

export default Tooltip
