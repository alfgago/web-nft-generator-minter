import React from "react"

import { RoadMapStyles } from "./RoadMapStyles"

const RoadMap = () => {
  return (
    <RoadMapStyles>
      <div className="col-1">
        <div className="content">
          <div>
            <h2>Roadmap</h2>
            <h3>date</h3>
            <h3>title</h3>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto sed tenetur iure, atque, quaerat nemo odit vitae quod
              dicta repudiandae illum, laborum doloremque cumque quis error
              temporibus impedit eaque commodi.
            </p>
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="content">
          <div>
            <h2 className="spacer">spacer</h2>
            <h3>date</h3>
            <h3>title</h3>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto sed tenetur iure, atque, quaerat nemo odit vitae quod
              dicta repudiandae illum, laborum doloremque cumque quis error
              temporibus impedit eaque commodi.
            </p>
          </div>
        </div>
      </div>
    </RoadMapStyles>
  )
}

export default RoadMap
