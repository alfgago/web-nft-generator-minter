import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"

import ItemPagination from "@/components/Common/ItemPagination"
import { GuestsListStyles } from "@/components/Tours/GuestsList/GuestsListStyles"

import DropItem from "./DropItem"

const GuestsList = () => {
  const [guestsList, setGuestsList] = useState<any[]>([])
  const { data: user } = useSession()

  const [filteredGuests, setFilteredGuests] = useState<any[]>([])

  const createOrderList = async () => {
    const nftGuestList = guestsList
    const eventGuests = []

    for (const nftGuests of nftGuestList) {
      const eventData = nftGuests.attributes.event.data.attributes
      const guests = []

      if (nftGuests.attributes.name && nftGuests.attributes.email) {
        guests.push({
          name: nftGuests.attributes.name,
          email: nftGuests.attributes.email,
          nft: nftGuests.attributes.nft,
        })
      }

      if (nftGuests.attributes.name2 && nftGuests.attributes.email2) {
        guests.push({
          name: nftGuests.attributes.name2,
          email: nftGuests.attributes.email2,
          nft: nftGuests.attributes.nft,
        })
      }

      const existingEventIndex = eventGuests.findIndex(
        (eventGuest) => eventGuest.event.id === eventData.id
      )

      if (existingEventIndex === -1) {
        eventGuests.push({
          event: eventData,
          guests: guests,
        })
      } else {
        eventGuests[existingEventIndex].guests.push(...guests)
      }
    }
    // set
    setFilteredGuests(eventGuests)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          // @ts-ignore
          "/api/guest-lists?user=" + 1
        )
        const gestList = data.data
        setGuestsList(gestList)
      } catch (err: any) {
        console.log(err)
      }
    }
    if (user) {
      fetchData()
    }
  }, [])

  useEffect(() => {
    createOrderList()
  }, [guestsList])

  return (
    <GuestsListStyles>
      <div className="content">
        <div>
          <h1>Manage guest lists</h1>
        </div>
        <ItemPagination
          itemsPerPage={10}
          values={filteredGuests}
          render={(items: any, index: number) => {
            return (
              <div key={"guest-" + index} className="drops-container">
                {items.map((item: any, indexI: number) => {
                  return <DropItem key={"guestList" + indexI} item={item} />
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
