import React from "react"
import { MobileTittleStyles } from "./MobileTittleStyles"

const MobileTittle = ({ children }: { children: JSX.Element }) => {
  return (
    <MobileTittleStyles>
      <div>
        <h2 className="title">Log in</h2>
      </div>
      {children}
    </MobileTittleStyles>
  )
}

export default MobileTittle
