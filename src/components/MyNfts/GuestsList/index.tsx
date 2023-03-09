import React from "react"

import ItemPagination from "@/components/Common/ItemPagination"

import MyNftGuestsItem from "./MyNftGuestsItem"
import { MyNftGuestsListStyles } from "./MyNftGuestsListStyles"
import NodataGuests from "./NoDataGuests"

const items = [
  {
    id: 1,
    venue: "Nashville Stadium",
    state: "Georgia",
    city: "Nashville",
    date: "june 19",
    image: "/assets/img/myNftBlue.jpg",
  },
  {
    id: 2,
    venue: "Kansas Stadium",
    state: "Kansas",
    city: "Delaware",
    date: "September 11",
    image: "/assets/img/myNftBlue.jpg",
  },
  {
    id: 3,
    venue: "Georgia Stadium",
    state: "Georgia",
    city: "Nashville",
    date: "june 18",
    image: "/assets/img/myNftBlue.jpg",
  },
  {
    id: 4,
    venue: "California Stadium",
    state: "California",
    city: "San Francisco",
    date: "April 11",
    image: "/assets/img/myNftBlue.jpg",
  },
]

const MyNftGuestsList = ({ myNfts }: any) => {
  myNfts.map((items: any) => {
    console.log(items)
  })

  console.log(myNfts)
  return (
    <MyNftGuestsListStyles>
      <div className="content">
        {items.length > 0 ? (
          <>
            <h2>Access Guest List</h2>
            <ItemPagination
              itemsPerPage={3}
              values={items}
              render={(items: any) => {
                return (
                  <div className="items-cont">
                    {items.map((data: any) => {
                      return <MyNftGuestsItem key={data.id} guestData={data} />
                    })}
                  </div>
                )
              }}
            />
          </>
        ) : (
          <NodataGuests />
        )}
      </div>
    </MyNftGuestsListStyles>
  )
}

export default MyNftGuestsList
