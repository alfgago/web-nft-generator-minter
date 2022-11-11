import React from "react"

import AddButton from "@/components/Common/AddButton"
import Button from "@/components/Common/Button"
import ItemPagination from "@/components/Common/ItemPagination"

import { DropGuestListStyles } from "./DropGuestListStyles"
import GuestMenu from "./GuestMenu"
const DropGuestList = ({ data }: any) => {
  return (
    <DropGuestListStyles>
      <ItemPagination itemsPerPage={3} values={data.users}>
        <GuestMenu />
      </ItemPagination>
      <div className="btns-container">
        <AddButton label="Add name" />
        <Button
          backgroundColor="#D9D9D9"
          fontSize={16}
          label="Export guest list"
        />
      </div>
    </DropGuestListStyles>
  )
}

export default DropGuestList
