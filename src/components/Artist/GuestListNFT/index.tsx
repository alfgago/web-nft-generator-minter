import { useEffect, useState } from "react"
import axios from "axios"

import CardPass from "@/components/Common/CardPass"
import TypeList from "@/components/Common/TypeList"

import { GuestListNFTStyles } from "./GuestListNFTStyles"

const GuestListNFT = ({ artist }: any) => {
  const [selectedPassType, setSelectedPassType] = useState(0)
  const [passes, setPasses] = useState([])

  const types = [
    { name: "Lifetime", value: "Lifetime" },
    { name: "Lottery", value: "Lottery" },
    { name: "Tour", value: "Tour" },
    { name: "Single Event", value: "Single Event" },
  ]

  async function fetchData() {
    try {
      const { data } = await axios.get("/api/passes?artist=" + artist.id)
      const artistPasses = data.data
      setPasses(artistPasses)
    } catch (err: any) {
      console.log(err)
    }
  }

  // Fetch the data in the useEffect hook
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <GuestListNFTStyles>
      {passes.length > 0 ? (
        <div className="content">
          <div className="mobile-col2">
            <h2>Guest list NFTs</h2>
            <p className="subt-filter">Pass type:</p>
            <TypeList
              types={types}
              onSelect={setSelectedPassType}
              selected={selectedPassType}
            />
          </div>
          <div className="column1">
            {passes.map((item: any, index: number) => {
              return item.attributes.event.data ? (
                <CardPass
                  key={"pass" + index}
                  pass={item}
                  event={item.attributes.event.data.attributes}
                />
              ) : (
                <h3 className="not-found">
                  No {types[selectedPassType].name} Passes found for this
                  artist.
                </h3>
              )
            })}
          </div>
          <div className="column2">
            <h2>Guest list NFTs</h2>
            <p className="subt-filter">Pass type:</p>
            <TypeList
              types={types}
              onSelect={setSelectedPassType}
              selected={selectedPassType}
            />
          </div>
        </div>
      ) : (
        <div className="content no-data">
          <h2>Guest list NFTs</h2>
          <p>This artist has no events yet</p>
        </div>
      )}
    </GuestListNFTStyles>
  )
}

export default GuestListNFT
