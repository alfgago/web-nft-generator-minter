import React from "react"

import TeamCard from "../TeamCard"

import { AboutTeamStyles, TeamListStyles, TeamStyles } from "./TeamStyles"
const Team = ({ pageData, teamList }: any) => {
  const descripValidation = pageData.description
  const title = pageData.title
  return (
    <TeamStyles>
      <AboutTeamStyles className="content">
        <h2>{title}</h2>
        <p>{descripValidation}</p>
      </AboutTeamStyles>

      {/* row1 */}
      {teamList.map((item: any, index: number) => {
        return (
          <TeamListStyles
            key={"teamlist" + index}
            className={`content ${index % 2 === 0 ? "row1" : "row2"}`}
          >
            {item.members.map((member: any, indexM: number) => {
              return <TeamCard key={"team-card" + indexM} cardData={member} />
            })}
          </TeamListStyles>
        )
      })}
    </TeamStyles>
  )
}

export default Team
