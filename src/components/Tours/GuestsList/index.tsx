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

  const { data: user } = useSession()

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

  const orderList: { event: any; guests: any }[] = []

  guestsList.forEach((element: any) => {
    const event = element.attributes.event.data
    const guests = element.attributes.Guests
    // validar si el evento existe en el array order
    if (orderList.length < 1) {
      orderList.push({ event: event, guests: guests })
    }

    const containsEvent = orderList.every(
      (obj: any) => obj.event.id == event.id
    )

    if (containsEvent) {
      // si existe se debe de intentar agregar el current guest al evento
      // validar si existen los uaurios
      console.log("guests")
      console.log(guests)

      // recorre orderlist
      orderList.forEach((item: any) => {
        // unicamente valida los usuarios del evento actual
        if (item.event.id === event.id) {
          // recorre todos los guests del evento actual
          guests.forEach((guest: any) => {
            const attribute = "id"
            const value = guest.id
            const containsObjectWithAttribute = orderList.some(
              (obj: any) =>
                obj.hasOwnProperty(attribute) && obj[attribute] === value
            )
            if (!containsObjectWithAttribute) {
              item.guests.push(guest)
            }
          })
        }
      })

      // sino agregar
    } else {
      // si no existe hace un push de un nuevo objeto
      orderList.push({ event: event, guests: guests })
    }
  })
  console.log("orderList")
  console.log(orderList)

  return (
    <GuestsListStyles>
      <div className="content">
        <div>
          <h1>Manage guest lists</h1>
        </div>
        {/* <ItemPagination
          itemsPerPage={3}
          values={eventData}
          render={(items: any, index: number) => {
            return (
              <div className="drops-container">
                {items.map((data: any) => {
                  return <DropItem key={"guestList" + index} data={data} />
                })}
              </div>
            )
          }}
        /> */}
      </div>
    </GuestsListStyles>
  )
}

export default GuestsList
