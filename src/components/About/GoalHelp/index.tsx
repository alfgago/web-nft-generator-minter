import React from "react"

import { GoalHelpStyles } from "./GoalHelpStyles"
const GoalHelp = () => {
  return (
    <GoalHelpStyles>
      <div className="cols-cont">
        <div className="column col-1">
          <div className="bg-col1" />
          <div className="title">
            <h2>Our Goal Our Goal Our Go</h2>
          </div>
          <div className="goal-desc">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
              perspiciatis modi optio eaque aliquam impedit reprehenderit
              voluptatem quia sequi debitis, at aliquid harum repellat, veniam
              dolorem suscipit! Facere, dolores ipsam.
            </p>
          </div>
        </div>
        <div className="column col-2">
          <div className="title">
            <h2>Help Artists Help Artists </h2>
          </div>
          <div className="help-desc">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
              est consequuntur perferendis minus porro commodi nihil provident
              repellendus maiores! Consequuntur libero assumenda rem sapiente
              quam reprehenderit rerum minima maiores iure.
            </p>
          </div>
        </div>
      </div>
    </GoalHelpStyles>
  )
}

export default GoalHelp
