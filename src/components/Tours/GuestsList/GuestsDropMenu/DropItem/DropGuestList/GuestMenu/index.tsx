import React from "react"

import GuestItem from "./GuestItem"
import { GuestMenuStyles } from "./GuestMenuStyles"

const GuestMenu = ({ currentItems }: any) => {
  return (
    <GuestMenuStyles>
      {currentItems.map((data: any) => {
        return <GuestItem key={data.id} data={data} />
      })}
    </GuestMenuStyles>
  )
}

export default GuestMenu
