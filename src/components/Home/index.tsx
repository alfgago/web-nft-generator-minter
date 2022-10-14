import HomeHero from "./HomeHero"
import { HomeStyles } from "./HomeStyles"
import LotteryWinners from "./LotteryWinners"
import MoreSection from "./MoreSection"
import UpcomingDrawings from "./UpcomingDrawings"
import Login from "../Login"
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
  type: "pink",
  useBorderTop: false,
}

const Home = () => {
  return (
    <HomeStyles>
      <HomeHero trendingArtists={trendingArtists} />
      <MoreSection
        title={how1.title}
        description={how1.description}
        buttonTitle={how1.buttonTitle}
        buttonLink={how1.buttonLink}
        type={how1.type}
        useBorderTop={how1.useBorderTop}
      />
      <UpcomingDrawings />
      <MoreSection
        title={how2.title}
        description={how2.description}
        buttonTitle={how2.buttonTitle}
        buttonLink={how2.buttonLink}
        type={how2.type}
        useBorderTop={how2.useBorderTop}
      />
      <LotteryWinners />
      <UpcomingDrops />
    </HomeStyles>
  )
}

export default Home
