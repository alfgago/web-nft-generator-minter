import React, { useEffect, useState } from "react"
import axios from "axios"

import { MyPerksStyles } from "./MyPerksStyles"
import Perk from "./Perk"

const MyPerks = ({ items }: any) => {
  const [passes, setPasses] = useState<any>([])
  const [filteredPasses, setFilteredPasses] = useState<any>([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const passesArray: any[] = []
      for (const nft of items) {
        let isCircle = false
        nft.metadata.attributes.map((item: any) => {
          if (
            (item.trait_type === "pass_type" && item.value === "Circle") ||
            (item.trait_type === "pass_type" && item.value === "Guest")
          ) {
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

      setPasses(passesArray)
    } catch (error) {
      console.log("Error")
      console.log(error)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [items])

  // filter function
  useEffect(() => {
    const filtered = passes
    // validate if the time is more than 48h
    if (filter === "upcoming") {
    } else if (filter === "active") {
    }

    // set only events that contains passes
    setFilteredPasses(filtered)
  }, [filter, passes])

  return (
    <MyPerksStyles>
      <div className="content">
        <div className="header-cont">
          <div>
            <h2>My Plus Perks</h2>
          </div>
        </div>

        {!loading ? (
          <>
            {passes.length > 0 ? (
              <>
                {passes.map((item: any, index: number) => (
                  <div className="items-cont" key={"perks-pag-" + { index }}>
                    <Perk itemData={item} />
                  </div>
                ))}
              </>
            ) : (
              <div className="not-found">No pass perks found</div>
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
    </MyPerksStyles>
  )
}

export default MyPerks
