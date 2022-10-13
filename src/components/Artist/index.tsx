import { ArtistStyles } from "./ArtistStyles"
import Faq from "./Faq"
import GuestListNFT from "./GuestListNFT"
import UpcomingDrawing from "./UpcomingDrawing"
import UpcomingDrops from "./UpcomingDrops"

const Artist = () => {
  return (
    <ArtistStyles>
      <GuestListNFT />
      <UpcomingDrops />
      <UpcomingDrawing />
      <Faq title="FAQ" />
    </ArtistStyles>
  )
}

export default Artist
