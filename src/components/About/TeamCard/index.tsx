import React from "react"

import { TeamCardStyles } from "./TeamCardStyles"
const TeamCard = ({ cardData }: any) => {
  //   console.log(cardData.image.data.attributes.url)
  const image = cardData.image.data.attributes.url
  return (
    <TeamCardStyles>
      <img src={image} alt="" />

      <p>{cardData.name}</p>
      <p>{cardData.Role}</p>
    </TeamCardStyles>
  )
}

export default TeamCard
