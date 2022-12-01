import React from "react"

import ItemPagination from "@/components/Common/ItemPagination"

import MyNftGuestsItem from "./MyNftGuestsItem"
import { MyNftGuestsListStyles } from "./MyNftGuestsListStyles"

const items = [
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
  {
    id: 3,
    tourPass: "Tour pass",
    name: "Nirvana",
    email: "Nirvana@gmail.com",
    image: "/assets/img/guest-img.png",
  },
  {
    id: 4,
    tourPass: "Tour pass",
    name: "Angelo",
    email: "Angelo@gmail.com",
    image: "/assets/img/guest-img.png",
  },
]

const MyNftGuestsList = () => {
  return (
    <MyNftGuestsListStyles>
      <div className="content">
        <h2>Access guest list</h2>

        <ItemPagination
          itemsPerPage={3}
          values={items}
          render={(items: any) => {
            return (
              <div className="content">
                {items.map((data: any) => {
                  return <MyNftGuestsItem key={data.id} guestData={data} />
                })}
              </div>
            )
          }}
        />
      </div>
    </MyNftGuestsListStyles>
  )
}

export default MyNftGuestsList
