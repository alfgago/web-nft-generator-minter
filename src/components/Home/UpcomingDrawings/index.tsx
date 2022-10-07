import Link from "next/link"

import {
  CardActions,
  CardDescription,
  CardPassType,
  PassTypeList,
} from "@/components/Common/CommonStyles"

import { UpcomingDrawingsStyles } from "./UpcomingDrawingsStyles"

const UpcomingDrawings = ({ title = "Upcoming Lottery Drawings" }: any) => {
  return (
    <UpcomingDrawingsStyles>
      <div className="content">
        <h2>{title}</h2>
        <div className="flex">
          <div>
            <CardPassType>
              <img src="/assets/img/demo-nft-pic.png" alt="nftPic" />
              <CardDescription>
                <div className="titles trap">
                  <div className="small-title">Warfield</div>
                  <div className="small-title">San Fran, CA</div>
                  <div className="small-title">9th June 2023</div>
                </div>
                <div className="descriptor">
                  <div className="timer">00:00:00</div>
                  <div>Purple man</div>
                </div>
                <CardActions>
                  <Link href="/">
                    <a className="btn">Enter Lottery</a>
                  </Link>
                </CardActions>
              </CardDescription>
              <img src="/assets/img/featured-2.jpg" alt="nftPic" />
            </CardPassType>
          </div>
          <div className="column2">
            <PassTypeList>
              <p>Artist:</p>
              <ul>
                <li className="active">Steve Aoki</li>
                <li>Artist B</li>
                <li>Artist C</li>
                <li>Artist D</li>
              </ul>
            </PassTypeList>
          </div>
        </div>
      </div>
    </UpcomingDrawingsStyles>
  )
}

export default UpcomingDrawings
