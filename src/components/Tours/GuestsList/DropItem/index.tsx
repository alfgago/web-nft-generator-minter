import { generateKey } from "crypto"
import React from "react"
import { useState } from "react"
import { ReactSVG } from "react-svg"
import DropGuestList from "../DropGuestList"
const DropItem = ({ data }: any) => {
  const [collapsed, setCollapsed] = useState(false)
  const location = data.state + ", " + data.city
  return (
    <>
      <div className="drop-container" key={data.id}>
        <div className="unc-content">
          <p>
            {location}, {data.date}
          </p>
        </div>
        <div className="unc-content">
          <button
            onClick={() => {
              setCollapsed(!collapsed)
            }}
          >
            {!collapsed ? (
              <ReactSVG src="/assets/vectors/uncollapse-drop.svg" />
            ) : (
              <ReactSVG src="/assets/vectors/collapse-drop.svg" />
            )}
          </button>
        </div>
        {collapsed && <DropGuestList key={generateKey} data={data} />}
      </div>
    </>
  )
}

export default DropItem
