import { CommonPill } from "@/components/Common/CommonStyles"

import { StepsHeaderStyles } from "./StepsHeaderStyles"

const StepsHeader = ({ activeStep = 1 }: any) => {
  return (
    <StepsHeaderStyles>
      <div className="content">
        <CommonPill className={activeStep == 1 ? "fill" : ""}>
          Step 1: Metadata
        </CommonPill>
        <CommonPill className={activeStep == 2 ? "fill" : ""}>
          Step 2: Art
        </CommonPill>
        <CommonPill className={activeStep == 3 ? "fill" : ""}>
          Step 3: Confirmation
        </CommonPill>
      </div>
    </StepsHeaderStyles>
  )
}

export default StepsHeader
