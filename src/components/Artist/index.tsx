import { ArtistStyles } from "./ArtistStyles"

const Artist = () => {
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
            <li>Amps Club Punks</li>
            <li>Stoned Night</li>
          </ul>
        </div>
      </main>
    </ArtistStyles>
  )
}

export default Artist
