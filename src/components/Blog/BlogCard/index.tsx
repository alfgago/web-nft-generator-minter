import React from "react"
import Link from "next/link"

import { BlogCardStyles } from "@/components/Blog/BlogCard/BlogCardStyles"
import { CommonPill } from "@/components/Common/CommonStyles"
const BlogCard = ({ blog }: any) => {
  const attributes = blog.attributes
  const title = attributes.title
  const category = attributes.category
  const getSrc = attributes.featured_image.data[0].attributes.formats.small.url
  const imgSrc = getSrc ? getSrc : "/assets/img/sample2.jpg"
  const slug = attributes.slug
  const excerpt = attributes.slug
    ? attributes.slug
    : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam iure autem asperiores saepe nostrum. Quaerat!"
  return (
    <BlogCardStyles>
      <div className="col-title">
        <span>
          <p>{category}</p>
        </span>
        <h2>{title}</h2>
      </div>
      <div className="col-img">
        <img src={imgSrc} alt="" />
      </div>
      <div className="col-summary">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
          laboriosam!
        </p>
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
