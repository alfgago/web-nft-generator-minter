import Link from "next/link"

import { CommonPill } from "../Common/CommonStyles"
import DropCard from "../Common/DropCard"
import SimpleHeader from "../Common/SimpleHeader"

import {
  BrowseStyles,
  HeroStyles,
  ListingStyles,
  PassListingStyles,
} from "./PassListingStyles"

const featuredArtists = [
  {
    name: "Kings of Leon",
    slug: "kings-of-leon",
    image: "/assets/img/featured-1.jpg",
  },
  {
    name: "Steve Aoki",
    slug: "steve-aoki",
    image: "/assets/img/featured-2.jpg",
  },
  {
    name: "Snoop Dogg",
    slug: "kings-of-leon",
    image: "/assets/img/featured-3.jpg",
  },
]

const artists = [
  {
    name: "Sample 1",
    slug: "steve-aoki",
    image: "/assets/img/featured-2.jpg",
  },
  {
    name: "Sample 2",
    slug: "steve-aoki",
    image: "/assets/img/featured-2.jpg",
  },
  {
    name: "Sample 3",
    slug: "steve-aoki",
    image: "/assets/img/featured-2.jpg",
  },
  {
    name: "Sample 4",
    slug: "steve-aoki",
    image: "/assets/img/featured-2.jpg",
  },
  {
    name: "Sample 5",
    slug: "steve-aoki",
    image: "/assets/img/featured-2.jpg",
  },
  {
    name: "Sample 6",
    slug: "steve-aoki",
    image: "/assets/img/featured-2.jpg",
  },
]

const PassListing = ({ passes }: any) => {
  console.log(passes)
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
