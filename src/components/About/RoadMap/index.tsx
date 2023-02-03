import React from "react"
import { ReactSVG } from "react-svg"

import { RoadMapStyles } from "./RoadMapStyles"

const RoadMap = ({ columnData1, columnData2 }: any) => {
  return (
    <RoadMapStyles>
      <ReactSVG
        src="/assets/icons/stars-cloud.svg"
        wrapper="span"
        className="bg"
      />
      <ReactSVG
        src="/assets/icons/stars-group.svg"
        wrapper="span"
        className="bg-2"
      />

      <div className="col-1">
        <div className="content">
          <div>
            <h2>Roadmap</h2>
            {columnData1.map((data: any, index: number) => {
              return (
                <div key={"roadmap1-item" + index}>
                  <h3>{data.dateTitle ? data.dateTitle : ""}</h3>
                  <h3>{data.title ? data.title : ""}</h3>
                  <p
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: data.description ? data.description : "",
                    }}
                  />
                  <br />
                </div>
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
                <div key={"roadmap2-item" + index}>
                  <h3>{data.dateTitle ? data.dateTitle : ""}</h3>
                  <h3>{data.title ? data.title : ""}</h3>
                  <p
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: data.description ? data.description : "",
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </RoadMapStyles>
  )
}

export default RoadMap
