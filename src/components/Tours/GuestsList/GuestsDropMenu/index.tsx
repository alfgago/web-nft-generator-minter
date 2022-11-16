import DropItem from "../DropItem"

import { GuestsDropMenuStyles } from "./GuestsDropMenuStyles"
const GuestsDropMenu = ({ currentItems }: any) => {
  return (
    <GuestsDropMenuStyles>
      {currentItems.map((data: any) => {
        return <DropItem key={data.id} data={data} />
      })}
    </GuestsDropMenuStyles>
  )
}

export default GuestsDropMenu
