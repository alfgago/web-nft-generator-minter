import React from "react"

import ItemPagination from "@/components/Common/ItemPagination"
import { GuestsListStyles } from "@/components/Tours/GuestsList/GuestsListStyles"

import DropItem from "./DropItem"

const items = [
  {
    id: 1,
    state: "Georgia",
    city: "Nashville",
    date: "june 19",
    users: [
      {
        id: 1,
        tourPass: "Tour pass",
        name: "Nicolas",
        email: "Nicolas@gmail.com",
        image: "/assets/img/guest-img.png",
      },
      {
        id: 2,
        tourPass: "Tour pass",
        name: "Alfred",
        email: "Alfred@gmail.com",
        image: "/assets/img/guest-img.png",
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
        id: 3,
        tourPass: "Tour pass",
        name: "Nirvana",
        email: "Nirvana@gmail.com",
        image: "/assets/img/guest-img.png",
      },
    ],
  },
  {
    id: 3,
    state: "California",
    city: "San Francisco",
    date: "April 11",
    users: [
      {
        id: 4,
        tourPass: "Tour pass",
        name: "Angelo",
        email: "Angelo@gmail.com",
        image: "/assets/img/guest-img.png",
      },
    ],
  },
  {
    id: 4,
    state: "Kansas",
    city: "Delaware",
    date: "September 11",
    users: [
      {
        id: 5,
        tourPass: "Tour pass",
        name: "David",
        email: "david@gmail.com",
        image: "/assets/img/guest-img.png",
      },
    ],
  },
]

const GuestsList = () => {
  return (
    <GuestsListStyles>
      <div className="content">
        <div>
          <h1>Manage guest lists</h1>
        </div>
        <ItemPagination
          itemsPerPage={3}
          values={items}
          render={(items: any) => {
            return (
              <div className="drops-container">
                {items.map((data: any) => {
                  return <DropItem key={data.id} data={data} />
                })}
              </div>
            )
          }}
        />
      </div>
    </GuestsListStyles>
  )
}

export default GuestsList
