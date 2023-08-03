import dynamic from "next/dynamic"
import { useWindowSize } from "usehooks-ts"

import { ArtistListStyles } from "./ArtistListStyles"
import ArtistsSwiper from "./ArtistsSwiper"
const StickyList = dynamic(() => import("./StickyList"))

const ArtistList = ({ artists, title, buttonTitle, buttonLink }: any) => {
  const { height, width } = useWindowSize()

  return (
    <ArtistListStyles
      id="stories"
      screenHeight={height}
      screenWidth={width}
      length={artists.length - 3}
    >
      {width > 1080 ? (
        <StickyList
          artists={artists}
          title={title}
          buttonTitle={buttonTitle}
          buttonLink={buttonLink}
          width={width}
          height={height}
        />
      ) : (
        <ArtistsSwiper
          artists={artists}
          title={title}
          buttonTitle={buttonTitle}
          buttonLink={buttonLink}
          width={width}
          height={height}
        />
      )}
    </ArtistListStyles>
  )
}

export default ArtistList
