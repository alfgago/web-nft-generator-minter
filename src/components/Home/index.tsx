import dynamic from "next/dynamic"

import ArtistList from "./ArtistList"
import HomeHero from "./HomeHero"
import { HomeStyles } from "./HomeStyles"
import LotteryWinners from "./LotteryWinners"
import MoreSection from "./MoreSection"
import UpcomingDrawings from "./UpcomingDrawings"
import UpcomingDrops from "./UpcomingDrops"

const trendingArtists = [
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

const how1 = {
  title: "How plus|one guest list NFT passes work",
  description:
    "Plus|one NFTs give you guest list access to your favorite artists.",
  buttonTitle: "Learn more",
  buttonLink: "/",
  type: "blue",
  useBorderTop: true,
}

const how2 = {
  title: "How Lottery NFTs Work",
  description:
    "Lottery NFTs give access to win a guest list pass for your favorite artists with drawings held 30 days before every show!",
  buttonTitle: "Learn more",
  buttonLink: "/",
  type: "purple",
  useBorderTop: false,
}

const Home = ({ page, passes }: any) => {
  const attributes = page.attributes
  const sections = attributes.sections

  return (
    <HomeStyles>
      <HomeHero
        title={attributes.title}
        copy={attributes.description}
        image={attributes.banner}
      />
      {sections.map((section: any, index: number) => {
        const type = section.__component
        return (
          <>
            {type == "lp.drops-component" && (
              <UpcomingDrops
                title={section.title}
                buttonTitle={section.button_text}
                buttonLink={section.button_link}
                useBorderTop={true}
                passes={passes}
              />
            )}
            {type == "lp.featured-artists" && (
              <ArtistList
                title={section.title}
                buttonTitle={section.button_text}
                buttonLink={section.button_link}
                artists={section.artists.data}
              />
            )}
            {type == "lp.lottery-drawings" && (
              <UpcomingDrawings title={section.title} />
            )}
            {type == "lp.info-section" && (
              <MoreSection
                title={section.title}
                description={section.description}
                buttonTitle={section.button_text}
                buttonLink={section.button_link}
                type={section.style}
              />
            )}
            {type == "lp.lottery-winners" && (
              <LotteryWinners title={section.title} />
            )}
          </>
        )
      })}
    </HomeStyles>
  )
}

export default Home
