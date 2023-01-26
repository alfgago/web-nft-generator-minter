import React from "react"

import { BlogListingStyles } from "@/components/Blog/BlogListing/BlogListingStyles"

import BlogCard from "../BlogCard"
const BlogListing = ({ allBlogs, firstBlog }: any) => {
  const arr = allBlogs.filter((item: any) => item.id !== firstBlog.id)

  return (
    <BlogListingStyles>
      <div className="content">
        <div className="list">
          {arr.map((blog: any, index: number) => {
            return <BlogCard key={"blog-list" + index} blog={blog} />
          })}
        </div>
      </div>
    </BlogListingStyles>
  )
}

export default BlogListing
