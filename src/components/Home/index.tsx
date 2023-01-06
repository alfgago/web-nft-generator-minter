import dynamic from "next/dynamic"

import HomeHero from "./HomeHero"
import { HomeStyles } from "./HomeStyles"

const ArtistList = dynamic(() => import("./ArtistList"))
const MoreSection = dynamic(() => import("./MoreSection"))
const UpcomingDrawings = dynamic(() => import("./UpcomingDrawings"))
const UpcomingDrops = dynamic(() => import("./UpcomingDrops"))
const LotteryWinners = dynamic(() => import("./LotteryWinners"))

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
