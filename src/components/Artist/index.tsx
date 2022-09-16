import { ArtistStyles, FaqStyles, ContainerPage } from "./ArtistStyles"

const Artist = () => {
  const renderWhiteSpaces = () => {
    const whiteSpaces = []
    for (let i = 1; i <= 20; i++) {
      whiteSpaces.push(<br />)
    }
    return whiteSpaces
  }
  return (
    <ArtistStyles>
      <main>
        <div>
          <div
            style={{
              width: 655,
              height: 307,
              background: "#fff",
              boxShadow: "0px 4px 32px rgba(0, 0, 0, 0.2)",
            }}
          ></div>
        </div>
        <div>
          <h1>Guest list NFT’s</h1>
          <p>Pass type:</p>
          <ul>
            <li className="active">Tour Pass</li>
            <li>Single Event</li>
            <li>Lottery</li>
            <li>Lifetime</li>
          </ul>
        </div>
      </main>
      <ContainerPage>
        <div className="content">{renderWhiteSpaces()}</div>
      </ContainerPage>
      <FaqStyles>
        <div className="faqContainer"></div>
      </FaqStyles>
    </ArtistStyles>
  )
}

export default Artist
