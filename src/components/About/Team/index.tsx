import React from "react"

import TeamCard from "../TeamCard"

import { AboutTeamStyles, TeamListStyles, TeamStyles } from "./TeamStyles"
const Team = ({ pageData, teamList }: any) => {
  const descripValidation = pageData.description
    ? pageData.description
    : "Our team is made up of a community of technology and music fans always looking for new members to add value to our platform. Reach out and tell us how you’d like to be a part of the team!"
  const title = pageData.title ? pageData.title : "Team"
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
            key={"teamlist" + 1}
            className={`content ${index % 2 === 0 ? "row1" : "row2"}`}
          >
            {item.row.map((member: any, indexM: number) => {
              return <TeamCard key={"team-card" + indexM} cardData={member} />
            })}
          </TeamListStyles>
        )
      })}
    </TeamStyles>
  )
}

export default Team
