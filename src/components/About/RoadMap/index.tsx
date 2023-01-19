import React from "react"

import { RoadMapStyles } from "./RoadMapStyles"

const RoadMap = ({ columnData1, columnData2 }: any) => {
  return (
    <RoadMapStyles>
      <div className="col-1">
        <div className="content">
          <div>
            <h2>Roadmap</h2>
            {columnData1.map((data: any, index: number) => {
              return (
                <span key={"roadmap1-item" + index}>
                  <h3>{data.date}</h3>
                  <h3>{data.title}</h3>
                  <p className="description">{data.description}</p>
                </span>
              )
            })}
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="content">
          <div>
            <h2 className="spacer">spacer</h2>
            {columnData2.map((data: any, index: number) => {
              return (
                <span key={"roadmap2-item" + index}>
                  <h3>{data.date}</h3>
                  <h3>{data.title}</h3>
                  <p className="description">{data.description}</p>
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </RoadMapStyles>
  )
}

export default RoadMap
