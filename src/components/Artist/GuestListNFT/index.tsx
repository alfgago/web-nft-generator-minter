import Link from "next/link"

import CardPass from "@/components/Common/CardPass"
import { PassTypeList } from "@/components/Common/CommonStyles"

import { GuestListNFTStyles } from "./GuestListNFTStyles"

const Artist = () => {
  const pass = {
    title: "Purple Man",
    image: "/assets/img/demo-nft-pic.png",
    venue: "Warfield",
    city: "San Fran, CA",
    date: "9th June 2023",
    type: "lottery",
  }
  return (
    <GuestListNFTStyles>
      <div className="content">
        <div className="column1">
          <CardPass pass={pass} />
        </div>
        <div className="column2">
          <h2>Guest list NFTs</h2>
          <PassTypeList>
            <p>Pass type:</p>
            <ul>
              <li className="active">Tour Pass</li>
              <li>Single Event</li>
              <li>Lottery</li>
              <li>Lifetime</li>
            </ul>
          </PassTypeList>
        </div>
      </div>
    </GuestListNFTStyles>
  )
}

export default Artist
