import { useEffect, useState } from "react"
import Link from "next/link"

import { HomeHeroStyles } from "./HomeHeroStyles"

declare const window: any

const HomeHero = ({ trendingArtists }: any) => {
  const [active, setActive] = useState(1)

  useEffect(() => {
    window.current = 1
    const timer = setInterval(() => {
      changeActive()
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const changeActive = () => {
    window.current = window.current + 1
    if (window.current > 3) {
      window.current = 1
    }
    setActive(window.current)
  }

  return (
    <HomeHeroStyles>
      <div className="background-gradient">
        <img
          src="/assets/img/gradient/1.jpg"
          alt="gradient"
          className={active == 1 ? "active" : ""}
        />
        <img
          src="/assets/img/gradient/2.jpg"
          alt="gradient"
          className={active == 2 ? "active" : ""}
        />
        <img
          src="/assets/img/gradient/3.jpg"
          alt="gradient"
          className={active == 3 ? "active" : ""}
        />
      </div>

      <div className="content">
        <div className="top">
          {trendingArtists.map((artist: any) => {
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
          <h2>Trending Artists</h2>
        </div>
      </div>
    </HomeHeroStyles>
  )
}

export default HomeHero
