import HomeHero from "./HomeHero"
import { HomeStyles } from "./HomeStyles"

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

const Home = () => {
  return (
    <HomeStyles>
      <HomeHero trendingArtists={trendingArtists} />
    </HomeStyles>
  )
}

export default Home
