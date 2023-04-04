import React from "react"
import { ReactSVG } from "react-svg"

import { TooltipStyles } from "./TooltipStyles"
const Tooltip = ({ placement = "right", text, icon = true, children }: any) => {
  return (
    <TooltipStyles className={placement}>
      {icon ? (
        <ReactSVG
          className="icon"
          wrapper="span"
          src="/assets/icons/help-circle.svg"
        />
      ) : (
        <span className="tooltip-hover">{children}</span>
      )}
      <div className="text">{text}</div>
    </TooltipStyles>
  )
}

export default Tooltip
