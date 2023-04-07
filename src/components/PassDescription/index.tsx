import { ReactSVG } from "react-svg"

import Tooltip from "../Tooltip"

const icons = [
  {
    href: "https://blockworks.co/news/ticketmaster-goes-live-with-nft-gated-features",
    tooltipText: "Token-Gated Presale",
    iconSrc: "/assets/icons/ticket.svg",
    showOnGuest: false,
  },
  {
    href: "https://www.shopify.com/tokengated-commerce",
    tooltipText: "Token Gated Merch Discounts",
    iconSrc: "/assets/icons/shirt.svg",
    showOnGuest: true,
  },
  {
    href: "https://techcrunch.com/2023/02/23/spotify-is-testing-playlists-that-could-be-unlocked-by-nft-holders/",
    tooltipText: "Token Gated Playlists",
    iconSrc: "/assets/icons/spotify.svg",
    showOnGuest: false,
  },
  {
    href: "https://www.alchemy.com/overviews/nft-token-gating",
    tooltipText: "Token-Gated Discord",
    iconSrc: "/assets/icons/discord.svg",
    showOnGuest: true,
  },
]

const PassDescription = ({ pass, isHome = false }: any) => {
  const passType = pass.attributes.pass_type
  const artistName = pass.attributes.artist?.data?.attributes?.name ?? ""
  const venue = pass.attributes.event?.data?.attributes?.name ?? ""
  const date = pass.attributes.event?.data?.attributes?.date ?? ""

  const dateFormat = (value: any) => {
    const date = new Date(value)
    const day = date.toLocaleString("default", { day: "2-digit" })
    const month = date.toLocaleString("default", { month: "long" })
    const year = date.toLocaleString("default", { year: "numeric" })
    return day + " " + month + " " + year
  }

  let description = ""
  if (passType == "Circle") {
    description = `This Circle Pass is ${artistName}'s community pass providing access 
                to one-of-a-kind single event guest pass giveaways for every show added to the plus|one platform.`
  }
  if (passType == "Circle" && isHome) {
    description = `You must own an artist's circle pass to enter golden guest pass giveaways. 
    <a href="/pass/${pass.attributes.contract_address}" title="Purchase ${artistName} Circle pass">Purchase ${artistName}'s circle pass here</a>`
    description =
      "Purchase an artist's Circle Pass to gain access to their Plus Perks and Golden Guest Pass giveaways"
  }
  if (passType == "Guest") {
    description = `This Guest Pass provides direct access to ${artistName}'s guest list at ${venue} on ${dateFormat(
      date
    )}.`
  }
  if (passType == "Infinity") {
    description = `Infinity passes coming soon!`
  }
  if (passType == "Tour") {
    description = `Tour passes coming soon!`
  }

  return (
    <div className="descriptor-box">
      <div
        className="left"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />

      <div className="right">
        <div className="perks">
          <div className="perks-title">Plus Perks:</div>
          <div className="icons">
            {icons.map((icon) => {
              const show = icon.showOnGuest || passType !== "Guest"
              const customClass = icon.href.includes("spotify") ? "spotify" : ""
              return (
                show && (
                  <a key={icon.href} href={icon.href}>
                    <Tooltip icon={false} text={icon.tooltipText}>
                      <ReactSVG
                        className={`icon ${customClass}`}
                        src={icon.iconSrc}
                      />
                    </Tooltip>
                  </a>
                )
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassDescription
