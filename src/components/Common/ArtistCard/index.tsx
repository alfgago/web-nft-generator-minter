import Link from "next/link"

import { CommonPill } from "../CommonStyles"

import { ArtistCardStyles } from "./ArtistCardStyles"

const ArtistCard = ({ artist, classes = "" }: any) => {
  const picture =
    artist.attributes.profile_picture?.data?.attributes.url ??
    artist.attributes.banner?.data?.attributes.url

  return (
    <ArtistCardStyles className={"drop-card " + classes}>
      <div className="image-container">
        <img src={picture} alt={artist.name} />
      </div>
      <div className="inner">
        <div className="titles">
          <div className="title">{artist.attributes.name}</div>
          <div className="type">{artist.attributes.genre}</div>
          <div className="passes">
            {artist.attributes.passes.data.length}{" "}
            {artist.attributes.passes.data.length == 1
              ? "collection pass"
              : "collection passes"}
          </div>
        </div>
        <div className="actions">
          <Link href={"/artist/" + artist.attributes.slug}>
            <a>
              <CommonPill className="clickable blue small">
                See Artist
              </CommonPill>
            </a>
          </Link>
        </div>
      </div>
    </ArtistCardStyles>
  )
}

export default ArtistCard
