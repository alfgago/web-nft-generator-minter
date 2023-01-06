import React from "react"
import { useState } from "react"
import { generateKey } from "crypto"
import { ReactSVG } from "react-svg"

import DropGuestList from "./DropGuestList"
import { DropItemStyles } from "./DropItemStyles"
const DropItem = ({ data }: any) => {
  const [collapsed, setCollapsed] = useState(false)
  const location = data.state + ", " + data.city
  return (
    <DropItemStyles dropWidth={collapsed ? "none" : "40rem"}>
      <div className={`content drop-container ${collapsed ? "bg-opned" : ""}`}>
        <div className="unc-content">
          <p>
            {location}, {data.date}
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
        {collapsed && <DropGuestList key={generateKey} data={data} />}
      </div>
    </DropItemStyles>
  )
}

export default DropItem
