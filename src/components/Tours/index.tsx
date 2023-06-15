import React from "react"

import TourFilters from "@/components/Tours/TourFilters"

import SimpleHeader from "../Common/SimpleHeader"

import EditArtistProfile from "./EditArtistProfile"
import GuestsList from "./GuestsList"
import NftCollections from "./NftCollections"
import { TourStyles } from "./TourStyles"

const Tours = () => {
  return (
    <TourStyles>
      <SimpleHeader title="Manager" backgroundColor="blue" textAlign="center">
        <EditArtistProfile />
      </SimpleHeader>
      <TourFilters />
      <NftCollections />
      <GuestsList />
    </TourStyles>
  )
}

export default Tours
