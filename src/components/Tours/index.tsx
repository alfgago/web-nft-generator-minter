import React from "react"

import TourFilters from "@/components/Tours/TourFilters"

import SimpleHeader from "../Common/SimpleHeader"

import EditArtistProfile from "./EditArtistProfile"
import GuestsList from "./GuestsList"
import NftCollections from "./NftCollections"
import GroupChat from "../GroupChat"

import { TourStyles } from "./TourStyles"

const Tours = () => {
  return (
    <TourStyles>
      <SimpleHeader
        title="Tour Manager"
        backgroundColor="blue"
        textAlign="center"
      >
        <EditArtistProfile />
      </SimpleHeader>
      <TourFilters />
      <NftCollections />
      <GuestsList />
      <GroupChat/>
    </TourStyles>
  )
}

export default Tours
