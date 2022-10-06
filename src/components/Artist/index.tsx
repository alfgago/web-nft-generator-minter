import { ArtistStyles, FaqStyles } from "./ArtistStyles"
import GuestListNFT from "./GuestListNFT"
import UpcomingDrawing from "./UpcomingDrawing"
import UpcomingDrops from "./UpcomingDrops"

const Artist = () => {
  return (
    <ArtistStyles>
      <GuestListNFT />
      <UpcomingDrops />
      <UpcomingDrawing />

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
