import UpcomingDrawing from "@/components/Artist/UpcomingDrawing"

import { ArtistStyles } from "./ArtistStyles"
import GuestListNFT from "./GuestListNFT"
import SuggestedArtists from "./SuggestedArtists"
import UpcomingDrops from "./"

const Artist = ({ artist }: any) => {
  return (
    <ArtistStyles>
      {artist != undefined && (
        <>
          <GuestListNFT artist={artist} />
          <UpcomingDrops events={artist.attributes.events} />
          <UpcomingDrawing artistId={artist.id} />
          <SuggestedArtists title="Suggested Artists" />
        </>
      )}
    </ArtistStyles>
  )
}

export default Artist
