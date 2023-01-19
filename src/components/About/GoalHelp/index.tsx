import React from "react"
import Marquee from "react-fast-marquee"
import { ReactSVG } from "react-svg"

import { GoalHelpStyles } from "./GoalHelpStyles"
const GoalHelp = ({ goal, helpArtists }: any) => {
  const headerAmount = [1, 2, 3, 4]
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
            <Marquee
              pauseOnHover={true}
              direction={"right"}
              speed={50}
              gradient={false}
            >
              {headerAmount.map((h: any, index: number) => {
                return (
                  <h2
                    key={"head-" + index}
                    className={index % 2 == 0 ? `white-h` : ""}
                  >
                    {goal.title}
                  </h2>
                )
              })}
            </Marquee>
          </div>
          <div className="goal-desc">
            <p>{goal.description}</p>
          </div>
        </div>
        <ReactSVG className="star" src="/assets/icons/star.svg" />
        <div className="column col-2">
          <div className="title">
            <Marquee
              pauseOnHover={true}
              direction={"left"}
              speed={50}
              gradient={false}
            >
              {headerAmount.map((h: any, index: number) => {
                return (
                  <h2
                    key={"head-" + index}
                    className={index % 2 == 0 ? `white-h` : ""}
                  >
                    {helpArtists.title}
                  </h2>
                )
              })}
            </Marquee>
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
