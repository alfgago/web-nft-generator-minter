import { COLORS } from "@/styles/variables"

import { CommonPill } from "../CommonStyles"

import { ButtonStyles } from "./ButtonStyles"

const Button = ({
  action,
  label,
  fontSize = 24,
  backgroundColor = "inherit",
  textColor = `${COLORS.black}`,
  hoverBackgroundColor = `${COLORS.black}`,
  hoverTextColor = `${COLORS.white}`,
}: any) => {
  return (
    <ButtonStyles
      backgroundColor={backgroundColor}
      textColor={textColor}
      hoverTextColor={hoverTextColor}
      hoverBackgroundColor={hoverBackgroundColor}
      fontSize={fontSize}
      className="clickable"
      onClick={() => action()}
    >
      {label}
    </ButtonStyles>
  )
}

export default Button
