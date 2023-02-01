import React from "react"

import TeamCard from "../TeamCard"

import { AboutTeamStyles, TeamListStyles, TeamStyles } from "./TeamStyles"
const Team = ({ team, teamDescription }: any) => {
  const descripValidation = teamDescription
    ? teamDescription
    : "Our team is made up of a community of technology and music fans always looking for new members to add value to our platform. Reach out and tell us how you’d like to be a part of the team!"

  return (
    <TeamStyles>
      <AboutTeamStyles className="content">
        <h2>Team</h2>
        <p>{descripValidation}</p>
      </AboutTeamStyles>

      {/* row1 */}
      <TeamListStyles className="content row1">
        {team.map((item: any, index: number) => {
          return <TeamCard key={"team-card" + index} cardData={item} />
        })}
      </TeamListStyles>
    </TeamStyles>
  )
}

export default Team
