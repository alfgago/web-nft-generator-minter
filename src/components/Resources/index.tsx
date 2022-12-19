import FAQ from "./FAQ"
import { ResourcesStyles } from "./ResourcesStyles"
import SlidesBanner from "./SlidesBanner"

const Resources = ({ data, style, title }: any) => {
  const attributes = data.attributes

  return (
    <ResourcesStyles>
      <SlidesBanner title={title} slides={attributes.banners} style={style} />
      <FAQ faqs={attributes.FAQ} />
    </ResourcesStyles>
  )
}

export default Resources
