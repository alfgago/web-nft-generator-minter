import React from "react"
import Link from "next/link"

import { BlogCardStyles } from "@/components/Blog/BlogCard/BlogCardStyles"
import { CommonPill } from "@/components/Common/CommonStyles"
const BlogCard = ({
  blog = `kings-of-leon-and-the-golden-tickets
`,
}: any) => {
  return (
    <BlogCardStyles>
      <div className="col-title">
        <span>
          <p>Anoucement</p>
        </span>
        <h2>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, quo!
        </h2>
      </div>
      <div className="col-img">
        <img src="/assets/img/sample2.jpg" alt="" />
      </div>
      <div className="col-summary">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
          laboriosam!
        </p>
        <Link legacyBehavior href={"/resources/blog/" + blog}>
          <CommonPill className="clickable black small active">
            View post
          </CommonPill>
        </Link>
      </div>
    </BlogCardStyles>
  )
}

export default BlogCard
