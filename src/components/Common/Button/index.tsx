import { COLORS } from "@/styles/variables"

import { CommonPill } from "../CommonStyles"

import { ButtonStyles } from "./ButtonStyles"

const Button = ({ action, label }: any) => {
  return (
    <CommonPill className="clickable" onClick={() => action()}>
      {label}
    </CommonPill>
  )
}

export default Button
