import React from "react"

import { TeamCardStyles } from "./TeamCardStyles"
const TeamCard = ({ cardData }: any) => {
  console.log(cardData.name)
  return (
    <TeamCardStyles>
      <img src={cardData.image} alt="" />

      <p>{cardData.name}</p>
      <p>{cardData.role}</p>
    </TeamCardStyles>
  )
}

export default TeamCard
