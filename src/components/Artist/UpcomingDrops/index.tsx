import { BoxDrops, DropRow, UpcomingDropsStyles } from "./UpcomingDropsStyles"

const Artist = ({ events }: any) => {
  const dateFormat = (value: any) => {
    const date = new Date(value)
    const day = date.toLocaleString("default", { day: "2-digit" })
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.toLocaleString("default", { year: "numeric" })
    return day + " " + month + " " + year
  }

  return (
    <UpcomingDropsStyles>
      <div className="content">
        <h2 className="title">Upcoming Shows</h2>
        {events.data && events.data.length ? (
          <BoxDrops>
            {events.data.map((item: any, index: number) => {
              return (
                <DropRow key={index}>
                  <div className="place">
                    <span>
                      {item.attributes.venue_name} {item.attributes.address}{" "}
                      {item.attributes.city}
                    </span>
                  </div>
                  <div className="date" style={{ background: "#FFD1FB" }}>
                    {dateFormat(item.attributes.date)}
                  </div>
                  <div className="collection">
                    <img
                      src={
                        item.attributes.passes.data.length
                          ? item.attributes.passes?.data[0].attributes
                              .collection_preview_image.data.attributes.url
                          : "/assets/img/drop-pic-2.png"
                      }
                      alt="artist show nft pic"
                    />
                    <div className="name">
                      {item.attributes.passes.data.length
                        ? item.attributes.passes?.data[0].attributes
                            .collection_name
                        : "-"}
                    </div>
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
          <h3>This artist does not have upcoming shows.</h3>
        )}
      </div>
    </UpcomingDropsStyles>
  )
}

export default Artist
