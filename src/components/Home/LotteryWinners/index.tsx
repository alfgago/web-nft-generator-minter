import { DropRow, LotteryWinnersStyles } from "./LotteryWinnersStyles"

const Artist = () => {
  return (
    <LotteryWinnersStyles>
      <div className="content">
        <h2 className="title">Recent Lottery Winners</h2>
        <div className="rows">
          <DropRow>
            <div className="date">June 9</div>
            <div className="collection">
              <img src="/assets/img/drop-pic-1.png" alt="dropPic" />
              <div className="name">Steve Aoki</div>
            </div>
            <div className="place">Warfield, San Fran, CA</div>
            <div className="winner">
              <small>Winner:</small>
              <span>68MMvc2...NPd</span>
            </div>
            <div className="actions">
              <button type="button">Make Offer</button>
            </div>
          </DropRow>
          <DropRow className="pink">
            <div className="date">June 9</div>
            <div className="collection">
              <img src="/assets/img/drop-pic-2.png" alt="dropPic" />
              <div className="name">Lottery 2</div>
            </div>
            <div className="place">Warfield, San Fran, CA</div>
            <div className="winner">
              <small>Winner:</small>
              <span>68MMvc2...NPd</span>
            </div>
            <div className="actions">
              <button type="button">Make Offer</button>
            </div>
          </DropRow>
          <DropRow>
            <div className="date">June 9</div>
            <div className="collection">
              <img src="/assets/img/drop-pic-1.png" alt="dropPic" />
              <div className="name">Lottery 3</div>
            </div>
            <div className="place">Warfield, San Fran, CA</div>
            <div className="winner">
              <small>Winner:</small>
              <span>68MMvc2...NPd</span>
            </div>
            <div className="actions">
              <button type="button">Make Offer</button>
            </div>
          </DropRow>
        </div>
      </div>
    </LotteryWinnersStyles>
  )
}

export default Artist
