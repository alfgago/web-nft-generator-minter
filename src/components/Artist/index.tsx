import { ArtistStyles } from "./ArtistStyles"
import Faq from "./Faq"
import GuestListNFT from "./GuestListNFT"
import SuggestedArtists from "./SuggestedArtists"
import UpcomingDrawing from "./UpcomingDrawing"
import UpcomingDrops from "./UpcomingDrops"

const Artist = ({ artistData }: any) => {
  return (
    <ArtistStyles>
      {artistData != undefined && (
        <>
          <GuestListNFT passList={artistData} />
          <UpcomingDrops events={artistData.attributes.events} />
          <UpcomingDrawing />
          <SuggestedArtists title="Suggested Artists" />
        </>
      )}
    </ArtistStyles>
  )
}

export default Artist
