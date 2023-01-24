import SimpleHeader from "../Common/SimpleHeader"

import BlogFilter from "./BlogFilter"
import BlogListing from "./BlogListing"
import { BlogStyles } from "./BlogStyles"

const Blog = ({ allBlogs }: any) => {
  return (
    <BlogStyles>
      <SimpleHeader title="Blog" textAlign="left" />
      <BlogFilter />
      <BlogListing allBlogs={allBlogs} />
    </BlogStyles>
  )
}

export default Blog
