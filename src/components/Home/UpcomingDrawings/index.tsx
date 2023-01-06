import { useEffect, useState } from "react"
import axios from "axios"

import CardPass from "@/components/Common/CardPass"
import TypeList from "@/components/Common/TypeList"

import { UpcomingDrawingsStyles } from "./UpcomingDrawingsStyles"

const UpcomingDrawings = ({ title = "Upcoming Lottery Drawings" }: any) => {
  const [selectedPass, setSelectedPass] = useState(0)

  const [passes, setPasses] = useState([])
  const [types, setTypes] = useState([])

  async function fetchData() {
    try {
      const { data } = await axios.get("/api/passes")
      // Update the state with the response data
      // @ts-ignore
      const typesList = []
      const passes = data.data

      passes.forEach((pass: any) => {
        typesList.push({ name: pass.attributes.artist.data.attributes.name })
      })
      setPasses(passes)
      // @ts-ignore
      setTypes(typesList)
    } catch (err: any) {
      console.log(err)
    }
  }

  // Fetch the data in the useEffect hook
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <UpcomingDrawingsStyles>
      <div className="content">
        <h2>{title}</h2>
        {passes.length ? (
          <div className="flex">
            <div className="column1">
              <TypeList
                types={types}
                onSelect={setSelectedPass}
                selected={selectedPass}
              />
            </div>
            <div className="column2">
              <CardPass pass={passes[selectedPass]} />
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
