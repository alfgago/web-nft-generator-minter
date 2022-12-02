import React, { useEffect, useState } from "react"

import ItemPagination from "@/components/Common/ItemPagination"

import OwnedItem from "./OwnedItem"
import { OwnedLotteryStyles } from "./OwnedLotteryStyles"

const lotteryItemsList = [
  {
    id: "1",
    title: "Act",
    description: "desc",
    origin: `active`,
  },
  {
    id: "2",
    title: "upc",
    description: "desc",
    origin: `upcoming`,
  },
]

const OwnedLottery = () => {
  const [lotteryNfts, setLotteryNfts] = useState(lotteryItemsList)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    let filteredList = lotteryItemsList
    if (filter) {
      filteredList = lotteryItemsList.filter((el) => el.origin == filter)
    }
    setLotteryNfts(filteredList)
  }, [filter])

  return (
    <OwnedLotteryStyles>
      <div className="content">
        <div className="header-cont">
          <div>
            <h2>Owned Lottery Nft's</h2>
          </div>
          <ul className="filters">
            <li onClick={() => setFilter("")}>All</li>
            <li onClick={() => setFilter("active")}>Active</li>
            <li onClick={() => setFilter("upcoming")}>Upcoming</li>
          </ul>
        </div>

        <ItemPagination
          itemsPerPage={3}
          values={lotteryNfts}
          render={(items: any) => {
            return (
              <div className="items-cont">
                {items.map((data: any) => {
                  return <OwnedItem key={data.id} itemData={data} />
                })}
              </div>
            )
          }}
        />
      </div>
    </OwnedLotteryStyles>
  )
}

export default OwnedLottery
