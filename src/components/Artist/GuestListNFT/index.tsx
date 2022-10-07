import Link from "next/link"

import {
  CardActions,
  CardDescription,
  CardPassType,
  PassTypeList,
} from "@/components/Common/CommonStyles"

import { GuestListNFTStyles } from "./GuestListNFTStyles"

const Artist = () => {
  return (
    <GuestListNFTStyles>
      <div className="content">
        <div>
          <CardPassType>
            <img src="/assets/img/demo-nft-pic.png" alt="nftPic" />
            <CardDescription>
              <h3>Purple Man</h3>
              <div className="descriptor">
                <div>Tour Pass</div>
                <div>Tour: Summer east Coast</div>
                <div>Floor Price:#432</div>
              </div>
              <CardActions>
                <Link href="/">
                  <a className="btn variant">Buy now</a>
                </Link>
                <Link href="/">
                  <a className="btn">Place Bid</a>
                </Link>
              </CardActions>
            </CardDescription>
          </CardPassType>
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
