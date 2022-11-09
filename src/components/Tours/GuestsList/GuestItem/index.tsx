import React from "react"
import { GuestItemStyles } from "./GuestItemStyles"
const GuestItem = ({ currentItems }: any) => {
  return (
    <>
      {currentItems.map((data: any) => {
        return (
          <GuestItemStyles key={data.name}>
            <div>img</div>
            <div>
              {data.name}
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div>check</div>
          </GuestItemStyles>
        )
      })}
    </>
  )
}

export default GuestItem
