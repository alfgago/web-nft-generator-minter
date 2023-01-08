import { ArtistStyles } from "./ArtistStyles"
import Faq from "./Faq"
import GuestListNFT from "./GuestListNFT"
import SuggestedArtists from "./SuggestedArtists"
import UpcomingDrawing from "./UpcomingDrawing"
import UpcomingDrops from "./UpcomingDrops"

const Artist = ({ artist }: any) => {
  console.log(artist)
  return (
    <ArtistStyles>
      {artist != undefined && (
        <>
          <GuestListNFT artist={artist} />
          <UpcomingDrops events={artist.attributes.events} />
          <UpcomingDrawing />
          <SuggestedArtists title="Suggested Artists" />
        </>
      )}
    </ArtistStyles>
  )
}

export default Artist
