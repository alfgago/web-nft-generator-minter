import { ReactSVG } from "react-svg"
import { GuestsDropMenuStyles } from "./GuestsDropMenuStyles"
const GuestsDropMenu = ({ currentItems }: any) => {
  return (
    <GuestsDropMenuStyles>
      {currentItems.map((val: any) => {
        const location = val.state + ", " + val.city

        return (
          <div className="drop-container" key={val.id}>
            <p>
              {location}, {val.date}
            </p>
            <ReactSVG src="/assets/vectors/uncollapse-drop.svg" />
          </div>
        )
      })}
    </GuestsDropMenuStyles>
  )
}

export default GuestsDropMenu
