import { useState } from "react"

import CardPass from "@/components/Common/CardPass"
import TypeList from "@/components/Common/TypeList"

import { GuestListNFTStyles } from "./GuestListNFTStyles"

const Artist = ({ passList }: any) => {
  const [selectedPassType, setSelectedPassType] = useState(0)

  const types = [
    { name: "Lifetime", value: "lifetime" },
    { name: "Lottery", value: "lottery" },
    { name: "Tour", value: "tour" },
    { name: "Single Event", value: "single-event" },
  ]

  return (
    <GuestListNFTStyles>
      {passList.attributes.passes.data.length > 0 ? (
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
            {passList.attributes.passes.data.map((item: any, index: number) => {
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

export default Artist
