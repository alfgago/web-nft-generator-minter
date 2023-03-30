// @ts-nocheck
import { useEffect, useState } from "react"
import axios from "axios"

import CardPass from "@/components/Common/CardPass"
import TypeList from "@/components/Common/TypeList"

import { UpcomingDrawingsStyles } from "./UpcomingDrawingsStyles"

const UpcomingDrawings = ({ title = "Upcoming Circle Drawings" }: any) => {
  const [selectedPass, setSelectedPass] = useState(0)
  const [selectedPassNav, setSelectedPassNav] = useState(0)

  const [passes, setPasses] = useState([])
  const [types, setTypes] = useState([])

  const getArtistShow = async (artistId) => {
    const { data } = await axios.get(
      "/api/shows?limit=1&future=true&artist=" + artistId
    )
    // Update the state with the response data
    const show = data.data.length ? data.data[0] : false

    return show
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/passes?type=Circle&future=true")
      // Update the state with the response data
      const passesWithShow = data.data
      for (const pass of passesWithShow) {
        const show = await getArtistShow(pass.attributes.artist.data.id)
        pass.attributes.upcomingShow = show
      }
      const groupedByArtist = passesWithShow.reduce((group: any, pass: any) => {
        if (pass.attributes.upcomingShow) {
          const category = pass.attributes.artist.data.attributes.name
          group[category] = group[category] ?? []
          group[category].push(pass)
        }
        return group
      }, {})

      const typesList = []
      Object.keys(groupedByArtist).forEach((artistName: any) => {
        typesList.push({ name: artistName })
      })
      setTypes(typesList)
      setPasses(Object.values(groupedByArtist))
    } catch (err: any) {
      console.log(err)
    }
  }

  // Fetch the data in the useEffect hook
  useEffect(() => {
    fetchData()
  }, [])

  const onSelectType = (sel: any) => {
    setSelectedPass(sel)
    setSelectedPassNav(0)
  }

  return (
    <UpcomingDrawingsStyles>
      <div className="content">
        <h2>{title}</h2>
        {passes.length ? (
          <div className="flex">
            <div className="column1">
              <TypeList
                types={types}
                onSelect={onSelectType}
                selected={selectedPass}
              />
            </div>
            <div className="column2">
              <div className="inner">
                {passes[selectedPass].map((pass: any, index: number) => {
                  return selectedPassNav == index ? (
                    <CardPass
                      key={"home-pass-" + selectedPass + "-" + index}
                      pass={pass}
                      event={pass.attributes.upcomingShow.attributes}
                      isGiveaway={true}
                      isHome={true}
                    />
                  ) : (
                    ""
                  )
                })}
                {passes[selectedPass].length > 1 ? (
                  <div className="counter">
                    {passes[selectedPass].map((pass: any, index: number) => {
                      return (
                        <button
                          key={"home-pass-counter" + selectedPass + "-" + index}
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
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </UpcomingDrawingsStyles>
  )
}

export default UpcomingDrawings
