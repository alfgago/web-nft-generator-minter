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
                June 9
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
        </div>
      </ContainerPage>
      <FaqStyles>
        <div className="faqContainer"></div>
      </FaqStyles>
    </ArtistStyles>
  )
}

export default Artist
