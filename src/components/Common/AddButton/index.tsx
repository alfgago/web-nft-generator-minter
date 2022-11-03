import React from "react"
import { ReactSVG } from "react-svg"
import { AddButtonStyle } from "../CommonStyles"
const AddButton = ({ action, label }: any) => {
  return (
    <AddButtonStyle onClick={() => action()}>
      <ReactSVG src="/assets/vectors/add-icon.svg" />
      <span>{label}</span>
    </AddButtonStyle>
  )
}
export default AddButton
