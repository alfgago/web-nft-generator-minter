import React from "react"
import { ReactSVG } from "react-svg"

import TourFilters from "@/components/Tours/TourFilters"

import SimpleHeader from "../Common/SimpleHeader"

import GuestsList from "./GuestsList"
import NftCollections from "./NftCollections"
import { TourStyles } from "./TourStyles"

const Tours = () => {
  return (
    <TourStyles>
      <SimpleHeader title="Manager" backgroundColor="blue" textAlign="center" />
      <TourFilters />
      <NftCollections />
      <GuestsList />
    </TourStyles>
  )
}

export default Tours
