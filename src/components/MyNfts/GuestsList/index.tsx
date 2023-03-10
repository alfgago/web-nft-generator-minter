import React, { useEffect, useState } from "react"
import axios from "axios"

import ItemPagination from "@/components/Common/ItemPagination"

import MyNftGuestsItem from "./MyNftGuestsItem"
import { MyNftGuestsListStyles } from "./MyNftGuestsListStyles"
import NodataGuests from "./NoDataGuests"

const MyNftGuestsList = ({ myNfts }: any) => {
  const [events, setEvents] = useState<number[]>([])

  const fetchData = async () => {
    // by the list of the shows get only the event attribute
    const eventsArray = myNfts.map((items: any) => {
      return items.metadata.attributes
        .map((item: any) => {
          return item.trait_type === "event" && item.value
        })
        .filter((event: any) => event !== false)
    })

    const filteredEventArr: number[] = []
    // remove the repeated values and undefined
    eventsArray.map((el: any) => {
      el[0] != undefined &&
        el !== false &&
        !filteredEventArr.includes(parseInt(el[0])) &&
        filteredEventArr.push(parseInt(el[0]))
    })

    const jsonArray = JSON.stringify(filteredEventArr)
    if (filteredEventArr.length > 0) {
      console.log(filteredEventArr)

      const { data } = await axios.get(
        "/api/shows/guest-lists?eventList=" + jsonArray
      )
      setEvents(data.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [myNfts])

  return (
    <MyNftGuestsListStyles>
      <div className="content">
        {events.length > 0 ? (
          <>
            <h2>Access Guest List</h2>
            <ItemPagination
              itemsPerPage={3}
              values={events}
              render={(items: any) => {
                return (
                  <div className="items-cont">
                    {items.map((data: any, index: number) => {
                      return (
                        <MyNftGuestsItem
                          key={"gustItemForm" + index}
                          guestData={data}
                        />
                      )
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
