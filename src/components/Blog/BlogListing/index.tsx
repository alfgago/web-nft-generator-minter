import React from "react"

import { BlogListingStyles } from "@/components/Blog/BlogListing/BlogListingStyles"

import BlogCard from "../BlogCard"
const BlogListing = ({ allBlogs }: any) => {
  return (
    <BlogListingStyles>
      <div className="content">
        <div className="list">
          {allBlogs.map((blog: any, index: number) => {
            return <BlogCard key={"blog-list" + index} blog={blog} />
          })}
        </div>
      </div>
    </BlogListingStyles>
  )
}

export default BlogListing
