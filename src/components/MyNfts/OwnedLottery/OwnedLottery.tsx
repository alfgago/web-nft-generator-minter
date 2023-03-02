import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAccount } from "wagmi"

import ItemPagination from "@/components/Common/ItemPagination"
import Index from "@/pages"

import OwnedItem from "./OwnedItem"
import { OwnedLotteryStyles } from "./OwnedLotteryStyles"

const OwnedLottery = () => {
  const [lotteryNfts, setLotteryNfts] = useState([])
  const [filter, setFilter] = useState("")
  const { address, isConnected } = useAccount()
  const [artistData, setArtistData] = useState([])

  const fetchData = async () => {
    try {
      // get the nft of the actual wallet
      const walletData = await axios.get("/api/nfts/owned?address=" + address)

      const filteredArray = walletData.data
        .map((nft: any) => {
          const valesp = nft.metadata.attributes
            // iterate over the metadata objs
            .map((item: any) => {
              // validate if the pass is lottery
              if (item.trait_type === "pass_type" && item.value === "Lottery") {
                return true
              }
              return false
            })
            // only need the info of the true elements
            .filter((event: any) => event !== false)

          return {
            name: nft.title,
            event: valesp[0] === true ? nft.metadata.image : "",
          }
        })
        .filter((event: any) => event.event != "")

      // get the artist info based on the image of the nft
      filteredArray.forEach(async (element: any, index: number) => {
        const { data } = await axios.get(
          `/api/artists/wallet-lottery?nftImage=${element.event}`
        )

        setArtistData(data.data[index].attributes.events.data)
        setLotteryNfts(artistData)
      })
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getTime = (targetTime: any, now: any = new Date()) => {
    const remainingTime = targetTime.getTime() - now.getTime()
    const seconds = Math.floor(remainingTime / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    return { hours: hours, minutes: minutes, seconds: seconds }
  }

  // filter function
  useEffect(() => {
    let filteredList = artistData
    // const remainingTime = getTime(new Date(el.attributes.date))

    // validate if the time is more than 48h
    if (filter === "upcoming") {
      filteredList = artistData.filter(
        (el: any) => getTime(new Date(el.attributes.date)).minutes > 2880
      )
    } else if (filter === "active") {
      // validate if is in valid time to be active
      filteredList = artistData.filter(
        (el: any) => getTime(new Date(el.attributes.date)).minutes < 2880
      )
    }
    setLotteryNfts(
      filteredList.filter((item: any) => item.attributes.passes.data.length > 0)
    )
  }, [filter, artistData])

  console.log("lotteryNfts")
  console.log(lotteryNfts)

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

        {lotteryNfts.length > 0 && (
          <ItemPagination
            itemsPerPage={3}
            values={lotteryNfts}
            render={(items: any) => {
              return (
                <div className="items-cont">
                  {/* iterate the events */}
                  {items.map((event: any) => {
                    return event.attributes.passes.data.map(
                      (pass: any, indexEvent: number) => {
                        // get the passes of the event

                        return (
                          <OwnedItem
                            key={"owned" + indexEvent}
                            eventData={event}
                            itemData={pass}
                          />
                        )
                      }
                    )
                  })}
                </div>
              )
            }}
          />
        )}
      </div>
    </OwnedLotteryStyles>
  )
}

export default OwnedLottery
