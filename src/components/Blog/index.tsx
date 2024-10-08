import { useEffect, useState } from "react"
import axios from "axios"
import { string } from "yup"

import SimpleHeader from "../Common/SimpleHeader"

import BlogFilter from "./BlogFilter"
import BlogListing from "./BlogListing"
import { BlogStyles } from "./BlogStyles"
import FirstBlog from "./FirstBlog"

const Blog = ({ allBlogs }: any) => {
  const [selectedType, setSelectedType] = useState(0)
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [blogs, setBlogs] = useState(allBlogs)
  const uniqueCat: { name: string }[] = [{ name: "All" }]
  const firstBlog = blogs[0]

  const filterList = blogs.filter((element: any) => {
    // validate if the filter exist
    const isDuplicated = uniqueCat.some((el) => {
      if (el.name === element.attributes.category) {
        return true
      }
      return false
    })
    if (!isDuplicated) {
      uniqueCat.push({ name: element.attributes.category })
    }
  })

  useEffect(() => {
    function filterByBlogCat(item: any) {
      return item.attributes.category == uniqueCat[selectedType].name
    }

    setFilteredBlogs(
      uniqueCat[selectedType].name == "All"
        ? blogs
        : blogs.filter(filterByBlogCat)
    )
  }, [selectedType])

  const onSelected = (index: any) => {
    setSelectedType(index)
  }

  return (
    <BlogStyles>
      <SimpleHeader title="Blog" textAlign="left" />
      <BlogFilter
        categories={uniqueCat}
        onSelected={onSelected}
        selected={selectedType}
      />
      <FirstBlog blog={firstBlog} />
      <BlogListing firstBlog={firstBlog} allBlogs={filteredBlogs} />
    </BlogStyles>
  )
}

export default Blog
