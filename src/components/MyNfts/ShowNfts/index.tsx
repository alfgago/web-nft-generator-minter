import React from "react"

import ItemPagination from "@/components/Common/ItemPagination"

import { ShowNftStyles } from "./ShowNfts"

const items = [{ id: "holla" }, { id: "holla" }]

const ShowNfts = () => {
  return (
    <ShowNftStyles>
      <ItemPagination
        itemsPerPage={2}
        values={items}
        render={(items: any) => {
          return (
            <div className="drops-container">
              {items.map((data: any) => {
                return <div key={data.id} />
              })}
            </div>
          )
        }}
      />
    </ShowNftStyles>
  )
}

export default ShowNfts
