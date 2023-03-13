import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"

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
  const [guestsList, setGuestsList] = useState([])
  const orderList: { event: any; guests: any }[] = []
  const { data: user } = useSession()

  const [filteredGuests, setFilteredGuests] = useState<any[]>([])
  const createOrderList = async () => {
    guestsList.forEach((element: any) => {
      const currentevent = element.attributes.event.data
      const currentGuests = element.attributes.Guests
      // validar si el evento existe en el array order
      if (orderList.length < 1) {
        orderList.push({ event: currentevent, guests: currentGuests })
      }

      const containsEvent = orderList.every(
        (obj: any) => obj.event.id == currentevent.id
      )

      if (containsEvent) {
        // recorre orderlist
        orderList.forEach((item: any) => {
          // unicamente valida los usuarios del evento actual
          if (item.event.id === currentevent.id) {
            // recorre todos los guests del guestlist actual
            currentGuests.forEach((guest: any) => {
              const containsGuest = item.guests.some(
                (obj: any) => obj.hasOwnProperty("id") && obj["id"] === guest.id
              )

              if (!containsGuest) {
                item.guests.push(guest)
              }
            })
          }
        })
        // sino agregar
      } else {
        // si no existe hace un push de un nuevo objeto
        orderList.push({ event: currentevent, guests: currentGuests })
      }
    })
    // set
    setFilteredGuests(orderList)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          // @ts-ignore
          "/api/guest-lists?user=" + user.id
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
          itemsPerPage={3}
          values={filteredGuests}
          render={(items: any, index: number) => {
            return (
              <div className="drops-container">
                {items.map((data: any, indexI: number) => {
                  return <DropItem key={"guestList" + indexI} data={data} />
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
