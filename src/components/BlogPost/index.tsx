import Image from "next/image"

import cleanUrl from "@/utils/cleanUrl"

import SimpleHeader from "../Common/SimpleHeader"

import { BlogPostStyles } from "./BlogPostStyles"

const BlogPost = ({ title, body, image, author, category }: any) => {
  const imageUrl = image.url
  const imageW = image.width
  const imageH = image.height

  return (
    <BlogPostStyles>
      <SimpleHeader title={title}>
        <div className="author">By {author}</div>
      </SimpleHeader>
      <section>
        <div className="content">
          <Image
            src={cleanUrl(imageUrl)}
            alt={title + " Featured Image"}
            quality={90}
            width={imageW}
            height={imageH}
            className="featured"
          />

          <div
            className="inner"
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          />
        </div>
      </section>
    </BlogPostStyles>
  )
}

export default BlogPost
