import FAQ from "./FAQ"
import { ResourcesStyles } from "./ResourcesStyles"
import SlidesBanner from "./SlidesBanner"

const Resources = ({ data, style, title, type }: any) => {
  const attributes = data.attributes

  return (
    <ResourcesStyles>
      <SlidesBanner title={title} slides={attributes.banners} style={style} />
      <FAQ faqs={attributes.FAQ} type={type} />
    </ResourcesStyles>
  )
}

export default Resources
