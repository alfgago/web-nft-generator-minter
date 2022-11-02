import React from "react"
import TourDates from "@/components/Tours/TourDates"
import TourFilters from "@/components/Tours/TourFilters"
import { ReactSVG } from "react-svg"
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
    </>
  )
}

export default Tours
