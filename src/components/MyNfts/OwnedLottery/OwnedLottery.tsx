import React, { useEffect, useState } from "react"
import axios from "axios"

import OwnedItem from "./OwnedItem"
import { OwnedLotteryStyles } from "./OwnedLotteryStyles"

const OwnedLottery = ({ items }: any) => {
  const [circlePasses, setCirclePasses] = useState<any>([])
  const [filteredPasses, setFilteredPasses] = useState<any>([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const passesArray: any[] = []
      console.log("items", items)
      for (const nft of items) {
        let isCircle = false
        nft.metadata.attributes.map((item: any) => {
          if (item.trait_type === "pass_type" && item.value === "Circle") {
            isCircle = true // validate if the pass is lottery
          }
        })

        if (isCircle) {
          const nftImage = nft.metadata.image
          const { data } = await axios.get(
            `/api/artists/wallet-lottery?nftImage=${nftImage}`
          )

          // Filter events to show only upcoming ones
          const events = data.data[0].attributes.events.data.filter(
            (event: any) => {
              const eventDate = new Date(event.date)
              const currentDate = new Date()
              // return eventDate >= currentDate
              return true
            }
          )

          passesArray.push({
            name: nft.title,
            image: nftImage,
            artist: data.data[0],
            events: events,
          })
        }
      }

      setCirclePasses(passesArray)
    } catch (error) {
      console.log("Error")
      console.log(error)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [items])

  const getTime = (targetTime: any, now: any = new Date()) => {
    const remainingTime = targetTime.getTime() - now.getTime()
    const seconds = Math.floor(remainingTime / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    return { hours: hours, minutes: minutes, seconds: seconds }
  }

  // filter function
  useEffect(() => {
    const filtered = circlePasses
    // validate if the time is more than 48h
    if (filter === "upcoming") {
    } else if (filter === "active") {
    }

    // set only events that contains passes
    setFilteredPasses(filtered)
    console.log("filtered", filtered)
  }, [filter, circlePasses])

  return (
    <OwnedLotteryStyles>
      <div className="content">
        <div className="header-cont">
          <div>
            <h2>Owned Circle Passes</h2>
          </div>
          <ul className="filters">
            <li
              className={filter === "" ? "active-filter" : ""}
              onClick={() => setFilter("")}
            >
              All
            </li>
            <li
              className={filter === "active" ? "active-filter" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </li>
            <li
              className={filter === "upcoming" ? "active-filter" : ""}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </li>
          </ul>
        </div>

        {!loading ? (
          <>
            {filteredPasses.length > 0 ? (
              <>
                {filteredPasses.map((item: any, index: number) => (
                  <div className="items-cont" key={"passes-pag-" + { index }}>
                    {item.events.map((event: any, j: number) => {
                      return (
                        <OwnedItem
                          key={"ownedPass-" + j}
                          itemData={item}
                          eventData={event}
                        />
                      )
                    })}
                  </div>
                ))}
              </>
            ) : (
              <div className="not-found">No owned circle passes found</div>
            )}
          </>
        ) : (
          <div className="loading">
            <img
              src="/assets/img/spinner.svg"
              className="spinner"
              alt="loader"
            />
          </div>
        )}
      </div>
    </OwnedLotteryStyles>
  )
}

export default OwnedLottery
