import { BoxDrops, DropRow, UpcomingDropsStyles } from "./UpcomingDropsStyles"

const Artist = () => {
  return (
    <UpcomingDropsStyles>
      <div className="content">
        <h2 className="title">Upcoming Shows</h2>
        <BoxDrops>
          <DropRow>
            <div className="place">Warfield, San Fran, CA</div>
            <div className="date">June 9</div>
            <div className="collection">
              <img src="/assets/img/drop-pic-1.png" alt="dropPic" />
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
          <DropRow>
            <div className="place">Warfield, San Fran, CA</div>
            <div className="date" style={{ background: "#FFD1FB" }}>
              June 10
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
        </BoxDrops>
      </div>
    </UpcomingDropsStyles>
  )
}

export default Artist
