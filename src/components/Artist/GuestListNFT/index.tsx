import { useEffect, useState } from "react"
import axios from "axios"
import { useWindowSize } from "usehooks-ts"

import CardPass from "@/components/Common/CardPass"
import TypeList from "@/components/Common/TypeList"

import { GuestListNFTStyles } from "./GuestListNFTStyles"

const GuestListNFT = ({ artist }: any) => {
  const { width } = useWindowSize()
  const [selectedPassType, setSelectedPassType] = useState(0)
  const [passes, setPasses] = useState([])
  const [filteredPasses, setFilteredPasses] = useState([])
  const [selectedPassNav, setSelectedPassNav] = useState(0)

  const types = [
    { name: "Circle", value: "Circle" },
    { name: "Guest", value: "Guest" },
    { name: "Infinity", value: "Infinity" },
    { name: "Tour", value: "Tour" },
  ]

  // Fetch the data in the useEffect hook
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/api/passes?artist=" + artist.id)
        const artistPasses = data.data
        setPasses(artistPasses)
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  // Fetch the data in the useEffect hook
  useEffect(() => {
    function filterByPassType(item: any) {
      return item.attributes.pass_type == types[selectedPassType].value
    }

    setFilteredPasses(passes.filter(filterByPassType))
    setSelectedPassNav(0)
  }, [selectedPassType, passes])

  return (
    <GuestListNFTStyles>
      {passes.length > 0 ? (
        <div className="content">
          {width < 1080 && (
            <div className="mobile-col2">
              <h2>Artist Passes</h2>
              <p className="subt-filter">Pass type:</p>
              <TypeList
                types={types}
                onSelect={setSelectedPassType}
                selected={selectedPassType}
              />
            </div>
          )}
          <div className="column1">
            {filteredPasses.length ? (
              filteredPasses.map((item: any, index: number) => {
                return selectedPassNav == index ? (
                  <CardPass key={"pass" + index} pass={item} />
                ) : (
                  ""
                )
              })
            ) : (
              <h3 className="not-found">
                No {types[selectedPassType].name} passes found for this artist.
              </h3>
            )}

            {filteredPasses.length > 1 ? (
              <div className="counter">
                {filteredPasses.map((pass: any, index: number) => {
                  return (
                    <button
                      key={"home-pass-counter" + selectedPassType + "-" + index}
                      className={`counter is-active-${
                        index == selectedPassNav
                      }`}
                      onClick={() => setSelectedPassNav(index)}
                    >
                      {index + 1}
                    </button>
                  )
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          {width > 1080 && (
            <div className="column2">
              <h2>Artist Passes</h2>
              <p className="subt-filter">Pass type:</p>
              <TypeList
                types={types}
                onSelect={setSelectedPassType}
                selected={selectedPassType}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="content no-data">
          <h2>Artist Passes</h2>
          <h3 className="not-found">This artist has no NFTs yet</h3>
        </div>
      )}
    </GuestListNFTStyles>
  )
}

export default GuestListNFT
