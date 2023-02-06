import React from "react"
import Image from "next/image"
import Link from "next/link"

import { BlogCardStyles } from "@/components/Blog/BlogCard/BlogCardStyles"
import { CommonPill } from "@/components/Common/CommonStyles"
import s3url from "@/utils/s3url"
const BlogCard = ({ blog }: any) => {
  const attributes = blog.attributes
  const title = attributes.title
  const category = attributes.category
  const slug = attributes.slug
  const excerpt = attributes.excerpt ? attributes.excerpt : ""

  const img = attributes.featured_image.data[0].attributes
  const getSrc = img.formats.small.url
  const imgSrc = getSrc ? getSrc : "/assets/img/sample2.jpg"
  const imageW = img.formats.small.width
  const imageH = img.formats.small.height
  return (
    <BlogCardStyles>
      <div className="col-title">
        <span className="category">
          <p>{category}</p>
        </span>
        <h2 className="title">{title}</h2>
      </div>
      <div className="col-img">
        <Image
          src={s3url(imgSrc)}
          alt={title + " featured image"}
          quality={90}
          width={imageW}
          height={imageH}
        />
      </div>
      <div className="col-summary">
        <p
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />
        <Link legacyBehavior href={"/resources/blog/" + slug}>
          <CommonPill className="clickable black small active">
            View post
          </CommonPill>
        </Link>
      </div>
    </BlogCardStyles>
  )
}

export default BlogCard
