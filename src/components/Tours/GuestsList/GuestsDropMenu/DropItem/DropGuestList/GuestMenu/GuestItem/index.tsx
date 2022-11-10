import React from "react"

const GuestItem = ({ data }: any) => {
  return (
    <>
      <div>
        <div>
          <img alt="Tour Logo" src={data.image} />
        </div>
        <div className="container">
          <div>NFT #Tour Pass #1</div>
          <div>{data.name} </div>
          <div>{data.email}</div>
        </div>
        <div>check</div>
      </div>
    </>
  )
}

export default GuestItem
