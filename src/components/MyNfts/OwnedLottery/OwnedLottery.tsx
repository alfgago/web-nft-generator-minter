import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAccount } from "wagmi"

import ItemPagination from "@/components/Common/ItemPagination"
import Index from "@/pages"

import OwnedItem from "./OwnedItem"
import { OwnedLotteryStyles } from "./OwnedLotteryStyles"

const lotteryItemsList = [
  {
    id: 1,
    origin: `upcoming`,
    chanceOfWinning: 50,
    nft: {
      id: "Bull-1",
      name: "Bull Island",
      info: "Illander bull",
      price: 500,
      amount: 10,
      image: "/assets/img/myNft.jpg",
      tourName: "Illander tour",
      stake: {
        staked: 9,
        total: 10,
      },
      property: {
        owned: 20,
        total: 90,
      },
    },
    event: {
      id: 1,
      venue: "Nashville Stadium",
      state: "Georgia",
      city: "Nashville",
      date: "june 19",
      timeLeftCalc: "5 hrs 30 min 21 sec",
    },
  },
  {
    id: 2,
    origin: `active`,
    chanceOfWinning: 60,
    nft: {
      id: "bull-2",
      name: "Green Island bull",
      info: "The Green Island bull",
      price: 200,
      amount: 100,
      image: "/assets/img/myNftBlue.jpg",
      tourName: "Green Island",
      stake: {
        staked: 10,
        total: 20,
      },
      property: {
        owned: 25,
        total: 90,
      },
    },
    event: {
      id: 2,
      venue: "Kansas Stadium",
      state: "Kansas",
      city: "Delaware",
      date: "September 11",
      timeLeftCalc: "8 days",
    },
  },
  {
    id: 3,
    origin: `upcoming`,
    chanceOfWinning: 45,
    nft: {
      id: "bull-3",
      name: "Dragon Bull",
      info: "The dragon concert",
      price: 700,
      amount: 35,
      image: "/assets/img/myNft.jpg",
      tourName: "Dragon Bull Tour",
      stake: {
        staked: 8,
        total: 15,
      },
      property: {
        owned: 40,
        total: 80,
      },
    },
    event: {
      id: 3,
      venue: "Georgia Stadium",
      state: "Georgia",
      city: "Nashville",
      date: "june 18",
      timeLeftCalc: "1 week",
    },
  },
  {
    id: 4,
    origin: `active`,
    chanceOfWinning: 50,
    nft: {
      id: "bull-4",
      name: "Ocean Concer",
      info: "Concert in the Ocean",
      price: 1500,
      amount: 250,
      image: "/assets/img/myNftBlue.jpg",
      tourName: "Ocean Concer Tour",
      stake: {
        staked: 25,
        total: 50,
      },
      property: {
        owned: 70,
        total: 15,
      },
    },
    event: {
      id: 4,
      venue: "California Stadium",
      state: "California",
      city: "San Francisco",
      date: "April 11",
      timeLeftCalc: "2 months",
    },
  },
]

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

        // console.log(data.data[index].attributes.events)
        setArtistData(data.data[index].attributes.events.data)
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
    setLotteryNfts(filteredList)
  }, [filter, artistData])

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

        {/* <ItemPagination
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
        /> */}
        {/* <div className="items-cont">
          {lotteryNfts.map((data: any) => {
            return <OwnedItem key={data.id} itemData={data} />
          })}
        </div> */}

        <div className="items-cont">
          {/* iterate the events */}
          {lotteryNfts.map((event: any, indexEvent: number) => {
            // get the passes of the event
            const passes = event.attributes.passes.data
            // iterate the passes of the event
            return passes.map((pass: any, index: number) => {
              return (
                <OwnedItem key={pass.id} eventData={event} itemData={pass} />
              )
            })
          })}
        </div>
      </div>
    </OwnedLotteryStyles>
  )
}

export default OwnedLottery
