import { ArtistStyles } from "./ArtistStyles"
import Faq from "./Faq"
import GuestListNFT from "./GuestListNFT"
import UpcomingDrawing from "./UpcomingDrawing"
import UpcomingDrops from "./UpcomingDrops"

const Artist = ({ artistData }: any) => {
  // const passList = artistData.passes

  // const eventsList = artistData.events.data

  // console.log(artistData)

  return (
    <ArtistStyles>
      {artistData != undefined && (
        <>
          <GuestListNFT passList={artistData} />
          {/* <UpcomingDrops events={artistData.attributes.events} /> */}
          <UpcomingDrawing />
          <Faq title="FAQ" />
        </>
      )}
    </ArtistStyles>
  )
}

export default Artist
