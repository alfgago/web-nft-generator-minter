import { useWindowSize } from "usehooks-ts"

import { ArtistListStyles } from "./ArtistListStyles"
import ArtistsSwiper from "./ArtistsSwiper"
import StickyList from "./StickyList"

const ArtistList = ({ artists }: any) => {
  const { height, width } = useWindowSize()

  return (
    <ArtistListStyles
      id="stories"
      screenHeight={height}
      screenWidth={width}
      length={artists.length - 3}
    >
      {width > 1080 ? (
        <StickyList artists={artists} width={width} height={height} />
      ) : (
        <ArtistsSwiper artists={artists} width={width} height={height} />
      )}
    </ArtistListStyles>
  )
}

export default ArtistList
