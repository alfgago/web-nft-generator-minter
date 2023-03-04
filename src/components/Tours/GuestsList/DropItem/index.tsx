import React, { useEffect } from "react"
import { useState } from "react"
import { generateKey } from "crypto"
import { ReactSVG } from "react-svg"

import DropGuestList from "./DropGuestList"
import { DropItemStyles } from "./DropItemStyles"
const DropItem = ({ data }: any) => {
  console.log(data)
  const [collapsed, setCollapsed] = useState(false)
  const location = data.attributes.venue_name
  const date = data.attributes.date
  const month = new Date(date).toLocaleString("default", {
    month: "long",
  })
  const day = new Date(date).toLocaleString("default", {
    day: "2-digit",
  })

  return (
    <DropItemStyles dropWidth={collapsed ? "none" : "40rem"}>
      <div className={`content drop-container ${collapsed ? "bg-opned" : ""}`}>
        <div className="unc-content">
          <p>
            {location ? location + "," : ""} {`${month} ${day}`}
          </p>
        </div>
        <div className="">
          <button
            onClick={() => {
              setCollapsed(!collapsed)
            }}
          >
            {!collapsed ? (
              <ReactSVG src="/assets/icons/uncollapse-drop.svg" />
            ) : (
              <ReactSVG src="/assets/icons/collapse-drop.svg" />
            )}
          </button>
        </div>
        {/* {!collapsed && (
          <DropGuestList key={"item" + Math.random()} data={passes} />
        )} */}
      </div>
    </DropItemStyles>
  )
}

export default DropItem
