import {
  CardActions,
  CardDescription,
  CardPassType,
  GuestListNFTStyles,
  PassTypeList,
} from "./GuestListNFTStyles"

const Artist = () => {
  return (
    <GuestListNFTStyles>
      <div className="content">
        <div>
          <CardPassType>
            <img src="/assets/img/demo-nft-pic.png" alt="nftPic" />
            <CardDescription>
              <h3>Purple Man</h3>
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
          <h2>Guest list NFT’s</h2>
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
      </div>
    </GuestListNFTStyles>
  )
}

export default Artist
