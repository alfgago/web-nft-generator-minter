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
              const imageUrl = item.attributes.passes.data.length
                ? item.attributes.passes?.data[0].attributes.preview_image_url
                : "/assets/img/drop-pic-2.png"
              return (
                <DropRow key={index}>
                  <div className="cont">
                    <div className="wrap-main">
                      <div className="main-cont">
                        <div className="row-1 ">
                          <div className="event-name">
                            <div className="name">
                              <span>{item.attributes.name} </span>
                            </div>
                            <div className="place">
                              <span>
                                {item.attributes.venue_name}{" "}
                                {item.attributes.address} {item.attributes.city}
                              </span>
                            </div>
                          </div>
                          <div
                            className="date"
                            style={{
                              background:
                                index % 2 == 1
                                  ? "#FFD1FB"
                                  : "rgba(104, 243, 243, 0.2)",
                            }}
                          >
                            {dateFormat(item.attributes.date)}
                          </div>
                        </div>
                        <div className="name-mobile">
                          {item.attributes.passes.data.length
                            ? item.attributes.passes?.data[0].attributes
                                .collection_name
                            : "-"}
                        </div>
                      </div>

                      <div className="collection">
                        <img src={imageUrl} alt="artist show nft pic" />
                        <div className="name">
                          {item.attributes.passes.data.length
                            ? item.attributes.passes?.data[0].attributes
                                .collection_name
                            : "-"}
                        </div>
                      </div>
                    </div>
                    <div className="wrap-end">
                      <div className="time">5 hrs 30 min 21 sec</div>
                      <div className="actions">
                        <button type="button">Add Name</button>
                        <button type="button" className="variant">
                          Set Reminder
                        </button>
                      </div>
                    </div>
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
