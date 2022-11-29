import { useState } from "react"

import CardPass from "@/components/Common/CardPass"
import TypeList from "@/components/Common/TypeList"

import { UpcomingDrawingsStyles } from "./UpcomingDrawingsStyles"

const UpcomingDrawings = ({ title = "Upcoming Lottery Drawings" }: any) => {
  const [selectedPass, setSelectedPass] = useState(0)

  const passes = [
    {
      name: "Steve Aoki",
      title: "Purple Man",
      collectionImage: "/assets/img/demo-nft-pic.png",
      artistImage: "/assets/img/featured-2.jpg",
      venue: "Warfield",
      city: "San Fran, CA",
      date: "9th June 2023",
      type: "lottery",
    },
    {
      name: "Snoop Dog",
      title: "Sample Data 2",
      collectionImage: "/assets/img/sample2.jpg",
      artistImage: "/assets/img/snoop.jpg",
      venue: "Warfield",
      city: "San Fran, CA",
      date: "6th December 2023",
      type: "lottery",
    },
    {
      name: "Ariana Grande",
      title: "Sample Data 3",
      collectionImage: "/assets/img/ariana.jpg",
      artistImage: "/assets/img/ariana.jpg",
      venue: "National Stadium",
      city: "San Jose, Costa Rica",
      date: "11th Jan 2023",
      type: "lottery",
    },
    {
      name: "Other artist",
      title: "Sample Data 4",
      collectionImage: "/assets/img/demo-nft-pic.png",
      artistImage: "/assets/img/featured-2.jpg",
      venue: "National Stadium",
      city: "San Jose, Costa Rica",
      date: "19th Feb 2023",
      type: "lottery",
    },
  ]

  return (
    <UpcomingDrawingsStyles>
      <div className="content">
        <h2>{title}</h2>
        <div className="flex">
          <div className="column1">
            <TypeList
              types={passes}
              onSelect={setSelectedPass}
              selected={selectedPass}
            />
          </div>
          <div className="column2">
            <CardPass pass={passes[selectedPass]} />
          </div>
        </div>
      </div>
    </UpcomingDrawingsStyles>
  )
}

export default UpcomingDrawings
