import Link from "next/link"

import { CommonPill } from "../CommonStyles"

import { CardPassStyles } from "./CardPassStyles"

const CardPass = ({ pass }: any) => {
  return (
    <CardPassStyles>
      <img src={pass.collectionImage} alt={pass.title} />
      <div className="inner">
        <div className="titles trap">
          <div className="venue">{pass.venue}</div>
          <div className="city">{pass.city}</div>
          <div className="date">{pass.date}</div>
        </div>
        <div className="descriptor">
          <div className="timer">{pass.timer}</div>
          <div>{pass.title}</div>
        </div>
        <div className="action">
          <Link href="/">
            <a>
              <CommonPill className="clickable fill small">
                Enter Lottery
              </CommonPill>
            </a>
          </Link>
        </div>
      </div>
      <img className="artist-pic" src={pass.artistImage} alt={pass.title} />
    </CardPassStyles>
  )
}

export default CardPass
