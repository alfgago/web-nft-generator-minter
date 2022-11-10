import React from "react"

import ItemPagination from "@/components/Common/ItemPagination"

import { DropGuestListStyles } from "./DropGuestListStyles"
import GuestMenu from "./GuestMenu"
const DropGuestList = ({ data }: any) => {
  return (
    <DropGuestListStyles>
      <ItemPagination itemsPerPage={3} values={data.users}>
        <GuestMenu />
      </ItemPagination>
    </DropGuestListStyles>
  )
}

export default DropGuestList
