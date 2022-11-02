import React from "react"
import TourDates from "@/components/Tours/TourDates"
import TourFilters from "@/components/Tours/TourFilters"

const Tours = () => {
  return (
    <>
      <TourFilters>
        <TourDates />
      </TourFilters>
    </>
  )
}

export default Tours
