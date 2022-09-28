import {
  ArtistStyles,
  FaqStyles,
  ContainerPage,
  CardPassType,
  CardDescription,
  CardActions,
  PassTypeList,
  BoxDrops,
  DropRow,
  BoxDrawing,
  DrawRow,
} from "./ArtistStyles"

const Artist = () => {
  return (
    <ArtistStyles>
      <main>
        <div>
          <CardPassType>
            <img src="./resources/img/demo-nft-pic.png" alt="nftPic" />
            <CardDescription>
              <h4>Purple Man</h4>
              <ul>
                <li>Tour Pass</li>
                <li>Tour: Summer east Coast</li>
                <li>Floor Price:#432</li>
              </ul>
              <CardActions>
                <button type="button" className="variant">
                  Buy now
                </button>
                <button type="button">Place Bid</button>
              </CardActions>
            </CardDescription>
          </CardPassType>
        </div>
        <div className="column2">
          <h1>Guest list NFT’s</h1>
          <PassTypeList>
            <p>Pass type:</p>
            <ul>
              <li className="active">Tour Pass</li>
              <li>Single Event</li>
              <li>Lottery</li>
              <li>Lifetime</li>
            </ul>
          </PassTypeList>
        </div>
      </main>
      <ContainerPage>
        <div className="mainContentPage">
          <h3 className="title">Upcoming drops</h3>
          <BoxDrops>
            <DropRow>
              <div className="place">Warfield, San Fran, CA</div>
              <div className="date">June 9</div>
              <div className="collection">
                <img src="./resources/img/drop-pic-1.png" alt="dropPic" />
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
                <img src="./resources/img/drop-pic-2.png" alt="dropPic" />
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
          <h3 className="title">Upcoming Drawing</h3>
          <BoxDrawing>
            <DrawRow>
              <div className="column1">
                <img src="./resources/img/draw-pic-1.png" alt="dropPic" />
                <div className="info">
                  <h5>Pink Buffalo</h5>
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
      </ContainerPage>
      <FaqStyles>
        <div className="faqContainer">
          <h3 className="title">FAQ</h3>
          <div className="faqBox">
            <ul>
              <li className="active">What are Guest List NFTs?</li>
              <li>How do I purchase a Guest List NFT?</li>
              <li>How do I use my NFT to access an artist's guest list?</li>
            </ul>
            <div className="answer">ANSWER</div>
          </div>
        </div>
      </FaqStyles>
    </ArtistStyles>
  )
}

export default Artist
