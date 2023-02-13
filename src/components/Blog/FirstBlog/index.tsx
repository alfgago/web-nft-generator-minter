import React from "react"
import Image from "next/image"
import Link from "next/link"

import { FirstBlogStyle } from "@/components/Blog/FirstBlog/FirstBlogStyle"
import { CommonPill } from "@/components/Common/CommonStyles"
import cleanUrl from "@/utils/cleanUrl"
const FirstBlog = ({ blog }: any) => {
  const attributes = blog.attributes
  const title = attributes.title
  const category = attributes.category
  const slug = attributes.slug
  const excerpt = attributes.excerpt ? attributes.excerpt : ""

  const img = attributes.featured_image.data[0].attributes
  const getSrc = img.formats.medium.url
  const imgSrc = getSrc ? getSrc : "/assets/img/sample2.jpg"
  const imageW = img.formats.medium.width
  const imageH = img.formats.medium.height

  return (
    <FirstBlogStyle>
      <div className="content">
        <div className="wrapper">
          <div className="col-img">
            <Image
              src={cleanUrl(imgSrc)}
              alt={title + " featured image"}
              quality={90}
              width={imageW}
              height={imageH}
            />
          </div>
          <div className="col-text">
            <span className="category">
              <p>{category}</p>
            </span>
            <h2 className="title">{title}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: excerpt,
              }}
            />
            <Link legacyBehavior href={"/resources/blog/" + slug}>
              <CommonPill className="clickable small white active btn">
                View post
              </CommonPill>
            </Link>
          </div>
        </div>
      </div>
    </FirstBlogStyle>
  )
}

export default FirstBlog
