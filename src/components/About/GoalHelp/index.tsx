import React from "react"
import { ReactSVG } from "react-svg"

import { GoalHelpStyles } from "./GoalHelpStyles"
const GoalHelp = ({ goal, helpArtists }: any) => {
  return (
    <GoalHelpStyles>
      <img
        src="/assets/img/top-triangle.png"
        alt="border-top"
        className="top-triangle"
      />
      <div className="cols-cont">
        <div className="column col-1">
          <div className="title">
            <h2>{goal.title}</h2>
          </div>
          <div className="goal-desc">
            <p>{goal.description}</p>
          </div>
        </div>
        <ReactSVG className="star" src="/assets/icons/star.svg" />
        <div className="column col-2">
          <div className="title">
            <h2>{helpArtists.title}</h2>
          </div>
          <div className="help-desc">
            <p>{helpArtists.description}</p>
          </div>
        </div>
      </div>
    </GoalHelpStyles>
  )
}

export default GoalHelp
