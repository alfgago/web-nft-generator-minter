import React from "react"

import AddButton from "@/components/Common/AddButton"
import Button from "@/components/Common/Button"
import ItemPagination from "@/components/Common/ItemPagination"

import GuestItem from "../GuestItem"

import { DropGuestListStyles } from "./DropGuestListStyles"
const DropGuestList = ({ data }: any) => {
  return (
    <DropGuestListStyles>
      <ItemPagination
        itemsPerPage={3}
        values={data.users}
        render={(items: any) => {
          return (
            <>
              {items.map((data: any, i: number) => (
                <GuestItem key={data.id} data={data} />
              ))}
            </>
          )
        }}
      />
      <div className="btns-container">
        <Button
          backgroundColor="#D9D9D9"
          fontSize={16}
          label="Export guest list"
        />
        <AddButton label="Add name" />
      </div>
    </DropGuestListStyles>
  )
}

export default DropGuestList
