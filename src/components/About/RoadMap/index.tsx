import React from "react"

import { RoadMapStyles } from "./RoadMapStyles"

const RoadMap = () => {
  return (
    <RoadMapStyles>
      <div className="cols-cont content">
        <div className="column col-1">
          <h2>Roadmap</h2>
          <h3>title</h3>
          <p>description</p>
        </div>
        <div className="column col-2">
          <h3>title</h3>
          <p>description</p>
        </div>
      </div>
    </RoadMapStyles>
  )
}

export default RoadMap
