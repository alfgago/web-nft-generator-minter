import React from "react"

import { BlogListingStyles } from "@/components/Blog/BlogListing/BlogListingStyles"

import BlogCard from "../BlogCard"
const BlogListing = ({ allBlogs }: any) => {
  const withoutFirst = [...allBlogs]
  withoutFirst.splice(0, 1)

  return (
    <BlogListingStyles>
      <div className="content">
        <div className="list">
          {withoutFirst.map((blog: any, index: number) => {
            return <BlogCard key={"blog-list" + index} blog={blog} />
          })}
        </div>
      </div>
    </BlogListingStyles>
  )
}

export default BlogListing
