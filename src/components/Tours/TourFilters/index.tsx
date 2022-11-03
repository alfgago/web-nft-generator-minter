import React from "react"
import { TourFilterStyles } from "./TourFilterStyles"

function TourFilters({ children }: { children: JSX.Element }) {
  return (
    <TourFilterStyles>
      <div className="top-triangle"></div>
      <div className="wrapper">
        <ul className="filters">
          <li>Bandsintown</li>
          <li>SongKick</li>
          <li>Manual</li>
        </ul>
        {children}
      </div>
    </TourFilterStyles>
  )
}

export default TourFilters
