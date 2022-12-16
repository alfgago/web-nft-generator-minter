import { CommonPill } from "../Common/CommonStyles"
import DropCard from "../Common/DropCard"
import SimpleHeader from "../Common/SimpleHeader"

import {
  BrowseStyles,
  ListingStyles,
  PassListingStyles,
} from "./PassListingStyles"

const PassListing = ({ passes }: any) => {
  return (
    <PassListingStyles>
      <SimpleHeader title="Pass Collections" textAlign="left" />
      <BrowseStyles>
        <section className="top-triangle">
          <div className="content">
            <div className="triangle-container">
              <span className="img-span">
                <img src="/assets/img/top-triangle-solo.png" alt="border-top" />
              </span>
            </div>
          </div>
        </section>
        <section className="filter-section">
          <div className="abs">
            <div className="content">
              <span className="title trap">Filter by pass type:</span>
              <ul className="filters">
                <li>
                  <CommonPill className="clickable small active">
                    All
                  </CommonPill>
                </li>
                <li>
                  <CommonPill className="clickable small">Tour Pass</CommonPill>
                </li>
                <li>
                  <CommonPill className="clickable small">
                    Single Event
                  </CommonPill>
                </li>
                <li>
                  <CommonPill className="clickable small">Lottery</CommonPill>
                </li>
                <li>
                  <CommonPill className="clickable small">Lifetime</CommonPill>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </BrowseStyles>
      <ListingStyles>
        <div className="content">
          <div className="list">
            {passes.map((item: any, index: number) => {
              return <DropCard key={"lottery-row" + index} pass={item} />
            })}
          </div>
        </div>
      </ListingStyles>
    </PassListingStyles>
  )
}

export default PassListing
