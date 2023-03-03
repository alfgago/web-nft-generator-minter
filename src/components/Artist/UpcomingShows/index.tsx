import { useEffect, useRef } from "react"

import ShowRow from "./ShowRow"
import { BoxDrops, UpcomingShowStyles } from "./UpcomingShowStyles"

const UpcomingShows = ({ events }: any) => {
  const upcSectionRef = useRef<any>(null)

  useEffect(() => {
    const sectionId = window.decodeURIComponent(window.location.hash)
    sectionId === "#upcoming-section" &&
      upcSectionRef.current.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <UpcomingShowStyles ref={upcSectionRef}>
      <div className="content">
        <h2 className="title">Upcoming Shows</h2>
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
