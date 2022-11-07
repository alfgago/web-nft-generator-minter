import React from "react"
import ItemPagination from "@/components/Common/ItemPagination"
import { GuestsListStyles } from "@/components/Tours/GuestsList/GuestsListStyles"
import GuestsDropMenu from "./GuestsDropMenu"

const items = [
  { id: 1, state: "Georgia", city: "Nashville", date: "june 19" },
  { id: 2, state: "Georgia", city: "Nashville", date: "june 18" },
  { id: 3, state: "California", city: "San Francisco", date: "April 11" },
  { id: 4, state: "Kansas", city: "Delaware", date: "September 11" },
]

const GuestsList = () => {
  return (
    <GuestsListStyles>
      <div>
        <h1>Manage guest lists</h1>
      </div>
      <ItemPagination itemsPerPage={3} values={items}>
        <GuestsDropMenu />
      </ItemPagination>
    </GuestsListStyles>
  )
}

export default GuestsList
