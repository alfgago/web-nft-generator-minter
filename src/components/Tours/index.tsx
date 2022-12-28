import React from "react"

import TourFilters from "@/components/Tours/TourFilters"

import SimpleHeader from "../Common/SimpleHeader"

import GuestsList from "./GuestsList"
import NftCollections from "./NftCollections"
import { TourStyles } from "./TourStyles"

const Tours = () => {
  return (
    <TourStyles>
      <SimpleHeader
        title="Tour Manager"
        backgroundColor="blue"
        textAlign="center"
      />
      <TourFilters />
      <NftCollections />
      <GuestsList />
    </TourStyles>
  )
}

export default Tours
