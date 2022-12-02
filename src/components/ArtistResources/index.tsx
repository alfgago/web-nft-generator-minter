import SimpleHeader from "../Common/SimpleHeader"

import { ArtistResourcesStyles } from "./ArtistResourcesStyles"

const copy =
  "Make money off your guest list while building a new digital community! You make up to 97.5% of every sale AND resale of plus|once guest list passes. If desired, you can easily designate a percentage of your revenue a cause of your choice"

const ArtistResources = () => {
  return (
    <ArtistResourcesStyles>
      <SimpleHeader title="Artist Resources" textAlign="left">
        {copy}
      </SimpleHeader>
    </ArtistResourcesStyles>
  )
}

export default ArtistResources
