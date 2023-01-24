import React from "react"

import { BlogListingStyles } from "@/components/Blog/BlogListing/BlogListingStyles"

import BlogCard from "../BlogCard"
const BlogListing = () => {
  return (
    <BlogListingStyles>
      <div className="content">
        <div className="list">
          <BlogCard />
        </div>
      </div>
    </BlogListingStyles>
  )
}

export default BlogListing
