import FAQ from "../Common/FAQ"
import SlidesBanner from "../Common/SlidesBanner"

import { FanResourcesStyles } from "./FanResourcesStyles"

const FanResources = ({ data }: any) => {
  const attributes = data.attributes

  return (
    <FanResourcesStyles>
      <SlidesBanner
        title="For Fans:"
        slides={attributes.banners}
        style="fans"
      />
      <FAQ faqs={attributes.FAQ} />
    </FanResourcesStyles>
  )
}

export default FanResources
