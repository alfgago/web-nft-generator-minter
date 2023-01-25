import SimpleHeader from "../Common/SimpleHeader"

import BlogFilter from "./BlogFilter"
import BlogListing from "./BlogListing"
import { BlogStyles } from "./BlogStyles"
import FirstBlog from "./FirstBlog"

const Blog = ({ allBlogs }: any) => {
  return (
    <BlogStyles>
      <SimpleHeader title="Blog" textAlign="left" />
      <BlogFilter />
      <FirstBlog blog={allBlogs[0]} />
      <BlogListing allBlogs={allBlogs} />
    </BlogStyles>
  )
}

export default Blog
