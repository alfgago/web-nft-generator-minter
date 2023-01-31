import React from "react"

import TeamCard from "../TeamCard"

import { AboutTeamStyles, TeamListStyles, TeamStyles } from "./TeamStyles"
const Team = ({ rowData1, rowData2 }: any) => {
  return (
    <TeamStyles>
      <AboutTeamStyles className="content">
        <h2>Team</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
          temporibus nemo, magni perspiciatis saepe at?
        </p>
      </AboutTeamStyles>

      {/* row1 */}
      <TeamListStyles className="content row1">
        {rowData1.map((item: any, index: number) => {
          return <TeamCard key={"team-card" + index} cardData={item} />
        })}
      </TeamListStyles>

      {/* row2 */}
      <TeamListStyles className="content row2">
        {rowData1.map((item: any, index: number) => {
          return <TeamCard key={"team-card" + index} cardData={item} />
        })}
      </TeamListStyles>
    </TeamStyles>
  )
}

export default Team
