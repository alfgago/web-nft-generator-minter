import React from "react"
import ItemPagination from "@/components/Common/ItemPagination"
import { GuestsListStyles } from "@/components/Tours/GuestsList/GuestsListStyles"
import GuestsDropMenu from "./GuestsDropMenu"

const items = [
  {
    id: 1,
    state: "Georgia",
    city: "Nashville",
    date: "june 19",
    users: [
      {
        tourPass: "Tour pass",
        name: "Nicolas",
        email: "Nicolas@gmail.com",
      },
      {
        tourPass: "Tour pass",
        name: "Alfred",
        email: "Alfred@gmail.com",
      },
    ],
  },
  {
    id: 2,
    state: "Georgia",
    city: "Nashville",
    date: "june 18",
    users: [
      {
        tourPass: "Tour pass",
        name: "Nirvana",
        email: "Nirvana@gmail.com",
      },
    ],
  },
  {
    id: 3,
    state: "California",
    city: "San Francisco",
    date: "April 11",
    users: [
      { tourPass: "Tour pass", name: "Angelo", email: "Angelo@gmail.com" },
    ],
  },
  {
    id: 4,
    state: "Kansas",
    city: "Delaware",
    date: "September 11",
    users: [{ tourPass: "Tour pass", name: "David", email: "david@gmail.com" }],
  },
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
