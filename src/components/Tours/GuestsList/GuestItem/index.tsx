import React from "react"

const GuestItem = ({ currentItems }: any) => {
  return (
    <div>
      {currentItems.map((data: any) => {
        return <div key={data.name}>{data.name}</div>
      })}
    </div>
  )
}

export default GuestItem
