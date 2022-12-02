import SimpleHeader from "../Common/SimpleHeader"

import { FanResourcesStyles } from "./FanResourcesStyles"

const copy =
  "The only place to get those exclusive guest list spots with easy entry - often skipping the line at the box office! And the only way into sold out shows!"

const FanResources = () => {
  return (
    <FanResourcesStyles>
      <SimpleHeader title="Fan Resources" textAlign="left">
        {copy}
      </SimpleHeader>
    </FanResourcesStyles>
  )
}

export default FanResources
