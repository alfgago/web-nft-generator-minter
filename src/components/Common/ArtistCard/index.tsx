import Image from "next/image"
import Link from "next/link"
import { ReactSVG } from "react-svg"

import cleanUrl from "@/utils/cleanUrl"

import { CommonPill } from "../CommonStyles"

import { ArtistCardStyles } from "./ArtistCardStyles"

const ArtistCard = ({ artist, classes = "" }: any) => {
  const picture =
    artist.attributes.profile_picture?.data?.attributes.url ??
    artist.attributes.banner?.data?.attributes.url
  return (
    <ArtistCardStyles className={"drop-card " + classes}>
      <div className="image-container">
        <Image
          src={cleanUrl(picture)}
          alt={artist.attributes.name}
          quality={90}
          width={350}
          height={350}
        />
        <div className="socials">
          <a href={artist.attributes.spotify} target="_blank" rel="noreferrer">
            <ReactSVG src="/assets/icons/spotify.svg" />
          </a>
          <a href={artist.attributes.youtube} target="_blank" rel="noreferrer">
            <ReactSVG src="/assets/icons/youtube.svg" />
          </a>
          <a
            href={artist.attributes.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <ReactSVG src="/assets/icons/instagram.svg" />
          </a>
          <a href={artist.attributes.facebook} target="_blank" rel="noreferrer">
            <ReactSVG src="/assets/icons/facebook.svg" />
          </a>
        </div>
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
          <Link legacyBehavior href={"/artist/" + artist.attributes.slug}>
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
