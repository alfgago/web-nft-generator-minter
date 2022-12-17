import { BoxDrops, DropRow, UpcomingDropsStyles } from "./UpcomingDropsStyles"

const Artist = ({ events }: any) => {
  const dateFormat = (value: any) => {
    const date = new Date(value)
    const day = date.toLocaleString("default", { day: "2-digit" })
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.toLocaleString("default", { year: "numeric" })
    return day + " " + month + " " + year
  }

  const eventsP = events.events.data
  // console.log(eventsP)

  return (
    <UpcomingDropsStyles>
      <div className="content">
        <h2 className="title">Upcoming Shows</h2>
        {eventsP.length > 0 ? (
          <BoxDrops>
            {eventsP.map((items: any, index: number) => {
              // console.log(items.attributes)
              return (
                <DropRow key={index}>
                  <div className="place">
                    {items.attributes.city != null && (
                      <span>{items.attributes.city},</span>
                    )}
                    {items.attributes.state != null && (
                      <span>{items.attributes.state},</span>
                    )}

                    {items.attributes.country != null && (
                      <span>{items.attributes.country}</span>
                    )}
                  </div>
                  <div className="date" style={{ background: "#FFD1FB" }}>
                    {dateFormat(items.attributes.date)}
                  </div>
                  <div className="collection">
                    <img src="/assets/img/drop-pic-2.png" alt="dropPic" />
                    <div className="name">Collections Names</div>
                  </div>
                  <div className="time">5 hrs 30 min 21 sec</div>
                  <div className="actions">
                    <button type="button">Add Name</button>
                    <button type="button" className="variant">
                      Set Reminder
                    </button>
                  </div>
                </DropRow>
              )
            })}
          </BoxDrops>
        ) : (
          <h3>This Artist do not have upcoming shows</h3>
        )}
      </div>
    </UpcomingDropsStyles>
  )
}

export default Artist
