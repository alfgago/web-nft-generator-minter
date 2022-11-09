import React from "react"
import ItemPagination from "@/components/Common/ItemPagination"
import GuestItem from "../GuestItem"
import { DropGuestListStyles } from "./DropGuestListStyles"
const DropGuestList = ({ data }: any) => {
  return (
    <DropGuestListStyles>
      <ItemPagination itemsPerPage={3} values={data.users}>
        <GuestItem />
      </ItemPagination>
    </DropGuestListStyles>
  )
}

export default DropGuestList
