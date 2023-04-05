import { useEffect, useRef } from "react"
import { ReactSVG } from "react-svg"

import Tooltip from "@/components/Tooltip"

import ShowRow from "./ShowRow"
import { BoxDrops, UpcomingShowStyles } from "./UpcomingShowStyles"

const UpcomingShows = ({ events }: any) => {
  const upcSectionRef = useRef<any>(null)

  useEffect(() => {
    const sectionId = window.decodeURIComponent(window.location.hash)
    sectionId === "#upcoming" &&
      upcSectionRef.current.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <UpcomingShowStyles ref={upcSectionRef}>
      <div className="content">
        <h2 className="title">Upcoming Shows</h2>
        <p className="desc">
          Connect your wallet to see show access status based on which passes
          you currently own{" "}
          <Tooltip text="Don't own any passes?  Purchase a single event guest pass for guaranteed access to the show, or purchase a circle pass and enter giveaways to win a free guest pass (each guest pass includes entry for two)" />
        </p>
        {events.data && events.data.length ? (
          <BoxDrops>
            {events.data.map((item: any, index: number) => {
              return <ShowRow key={index} index={index} item={item} />
            })}
          </BoxDrops>
        ) : (
          <h3>This artist does not have upcoming shows.</h3>
        )}
      </div>
    </UpcomingShowStyles>
  )
}

export default UpcomingShows
