import Link from "next/link"

import {
  ArtistsStyles,
  BrowseStyles,
  HeroStyles,
  ListingStyles,
} from "./ArtistsStyles"

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

const ArtistListing = () => {
  return (
    <ArtistsStyles>
      <HeroStyles className="">
        <div className="content">
          <div className="featured">
            <h1>Artists</h1>
            {featuredArtists.map((artist: any) => {
              return (
                <Link key={artist.name} href={"/artist/" + artist.slug}>
                  <div className="artist">
                    <Link key={artist.name} href={"/artist/" + artist.slug}>
                      <a className="link">
                        <div className="img-container">
                          <img src={artist.image} alt={artist.name} />
                        </div>
                        <div className="name">{artist.name}</div>
                      </a>
                    </Link>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </HeroStyles>
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
                <li className="active">All</li>
                <li>Tour Pass</li>
                <li>Single Event</li>
                <li>Lottery</li>
                <li>Lifetime</li>
              </ul>
            </div>
          </div>
        </section>
      </BrowseStyles>
      <ListingStyles>
        <div className="content" />
      </ListingStyles>
    </ArtistsStyles>
  )
}

export default ArtistListing
