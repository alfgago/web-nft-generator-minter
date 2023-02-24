import UpcomingDrawing from "@/components/Artist/UpcomingDrawing"

import { ArtistStyles } from "./ArtistStyles"
import GuestListNFT from "./GuestListNFT"
import SuggestedArtists from "./SuggestedArtists"
import UpcomingShows from "./UpcomingShows"

const Artist = ({ artist }: any) => {
  return (
    <ArtistStyles>
      {artist != undefined && (
        <>
          <GuestListNFT artist={artist} />
          <UpcomingShows events={artist.attributes.events} />
          <UpcomingDrawing artistId={artist.id} />
          <SuggestedArtists title="Suggested Artists" />
        </>
      )}
    </ArtistStyles>
  )
}

export default Artist
