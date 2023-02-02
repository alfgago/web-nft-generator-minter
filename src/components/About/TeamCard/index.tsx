import React from "react"

import { TeamCardStyles } from "./TeamCardStyles"
const TeamCard = ({ cardData }: any) => {
  //   console.log(cardData.image.data.attributes.url)
  // const image = cardData.image.data.attributes.url
  const image = cardData.image
  const name = cardData.name
  const role = cardData.role
  return (
    <TeamCardStyles>
      <img src={image} alt="" />

      <p>{name}</p>
      <p>{role}</p>
    </TeamCardStyles>
  )
}

export default TeamCard
