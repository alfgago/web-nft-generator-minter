import { ReactSVG } from "react-svg"
import { useState, useRef } from "react"
import { GuestsDropMenuStyles } from "./GuestsDropMenuStyles"
import DropItem from "../DropItem"
const GuestsDropMenu = ({ currentItems }: any) => {
  return (
    <GuestsDropMenuStyles>
      {currentItems.map((data: any) => {
        return <DropItem key={data.id} data={data} />
      })}
    </GuestsDropMenuStyles>
  )
}

export default GuestsDropMenu
