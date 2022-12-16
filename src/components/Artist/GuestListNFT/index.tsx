import { useState } from "react"

import CardPass from "@/components/Common/CardPass"
import TypeList from "@/components/Common/TypeList"

import { GuestListNFTStyles } from "./GuestListNFTStyles"

const Artist = ({ passList }: any) => {
  const [selectedPass, setSelectedPass] = useState(0)

  const passes = [
    {
      artist: "Steve Aoki",
      title: "Purple Man",
      collectionImage: "/assets/img/demo-nft-pic.png",
      artistImage: "/assets/img/featured-2.jpg",
      venue: "Warfield",
      city: "San Fran, CA",
      date: "9th June 2023",
      type: "lottery",
    },
    {
      artist: "Snoop Dog",
      title: "Sample Data 2",
      collectionImage: "/assets/img/demo-nft-pic.png",
      artistImage: "/assets/img/featured-2.jpg",
      venue: "Warfield",
      city: "San Fran, CA",
      date: "6th December 2023",
      type: "lottery",
    },
    {
      artist: "Ariana Grande",
      title: "Sample Data 3",
      collectionImage: "/assets/img/demo-nft-pic.png",
      artistImage: "/assets/img/featured-2.jpg",
      venue: "National Stadium",
      city: "San Jose, Costa Rica",
      date: "11th Jan 2023",
      type: "lottery",
    },
    {
      artist: "Other artist",
      title: "Sample Data 4",
      collectionImage: "/assets/img/demo-nft-pic.png",
      artistImage: "/assets/img/featured-2.jpg",
      venue: "National Stadium",
      city: "San Jose, Costa Rica",
      date: "19th Feb 2023",
      type: "lottery",
    },
  ]

  const types = [
    { name: "Tour Pass" },
    { name: "Single Event" },
    { name: "Lottery" },
    { name: "Lifetime" },
  ]

  // console.log(passList.passes.data)
  return (
    <>
      {passList != undefined && (
        <GuestListNFTStyles>
          <div className="content">
            <div className="column1">
              {passList.passes.data.map((items: any, index: number) => {
                return (
                  <CardPass key={"pass" + index} pass={items} />
                  // <CardPass key={"pass" + index} pass={items[selectedPass]} />
                )
              })}
            </div>
            <div className="column2">
              <h2>Guest list NFTs</h2>
              <TypeList
                types={types}
                onSelect={setSelectedPass}
                selected={selectedPass}
              />
            </div>
          </div>
        </GuestListNFTStyles>
      )}
    </>
  )
}

export default Artist
