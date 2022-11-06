import { CommonPill } from "@/components/Common/CommonStyles"

import { ConfirmationStepStyles } from "./ConfirmationStepStyles"

const ConfirmationStep = ({ previousAction, nextAction }: any) => {
  return (
    <ConfirmationStepStyles>
      Confirmation STEP
      <div className="buttons">
        <button onClick={() => previousAction()}>
          <CommonPill className="clickable">Previous</CommonPill>
        </button>
        <button onClick={() => nextAction()}>
          <CommonPill className="clickable fill">Confirm</CommonPill>
        </button>
      </div>
    </ConfirmationStepStyles>
  )
}

export default ConfirmationStep
