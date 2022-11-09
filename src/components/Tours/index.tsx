import React from "react"
import { ReactSVG } from "react-svg"

import TourDates from "@/components/Tours/TourDates"
import TourFilters from "@/components/Tours/TourFilters"

import GuestsList from "./GuestsList"
import NftCollections from "./NftCollections"
import { TourStyles } from "./TourStyles"
const Tours = () => {
  return (
    <>
      <TourStyles>
        <TourFilters>
          <TourDates />
        </TourFilters>
        <ReactSVG className="star" src="/assets/vectors/star.svg" />
      </TourStyles>
      <NftCollections />
      <GuestsList />
    </>
  )
}

export default Tours
