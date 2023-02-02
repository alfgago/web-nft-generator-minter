import React from "react"

import { TeamCardStyles } from "./TeamCardStyles"
const TeamCard = ({ cardData }: any) => {
  //   console.log(cardData.image.data.attributes.url)
  // const image = cardData.image.data.attributes.url
  return (
    <TeamCardStyles>
      <img src={cardData.image} alt="" />

      <p>{cardData.name}</p>
      <p>{cardData.role}</p>
    </TeamCardStyles>
  )
}

export default TeamCard
