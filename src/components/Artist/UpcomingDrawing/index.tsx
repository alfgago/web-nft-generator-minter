import {
  BoxDrawing,
  DrawRow,
  UpcomingDrawingStyles,
} from "./UpcomingDrawingStyles"

const Artist = () => {
  return (
    <UpcomingDrawingStyles>
      <div className="content">
        <h2 className="title">Upcoming Drawing</h2>
        <BoxDrawing>
          <DrawRow>
            <div className="column1">
              <div className="img-container">
                <img src="/assets/img/draw-pic-1.png" alt="dropPic" />
              </div>
              <div className="info">
                <h3>Pink Buffalo</h3>
                <div>
                  <p>Tour: Winter West Coast</p>
                  <p>Floor price #12</p>
                </div>
              </div>
            </div>
            <div className="column2">
              <div className="time">5 hrs 30 min 21 sec</div>
              <div className="place">Warfield, San Fran</div>
              <div className="date">June 9</div>
            </div>
            <div className="column3">
              <div>
                <span>Chance of winning</span>
                <p>%65</p>
              </div>
              <button type="button" className="variant">
                Enter Lottery
              </button>
            </div>
          </DrawRow>
        </BoxDrawing>
      </div>
    </UpcomingDrawingStyles>
  )
}

export default Artist
