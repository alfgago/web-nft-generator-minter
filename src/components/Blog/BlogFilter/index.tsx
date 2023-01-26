import React from "react"

import { FilterStyles } from "@/components/Blog/BlogFilter/BlogFilterStyles"

import { CommonPill } from "../../Common/CommonStyles"

import { BlogFilterStyles } from "./BlogFilterStyles"

const BlogFilter = ({ categories, onSelected, selected }: any) => {
  return (
    <BlogFilterStyles>
      <FilterStyles>
        <section className="top-triangle">
          <div className="content">
            <div className="triangle-container">
              <span className="img-span">
                <img
                  src="/assets/img/blog-filter-bg-solo.png"
                  alt="border-top"
                />
              </span>
            </div>
          </div>
        </section>
        <section className="filter-section">
          <div className="abs">
            <div className="content">
              <span className="title trap">Filter by:</span>
              <ul className="filters">
                {categories.map((cat: any, index: number) => (
                  <li
                    key={"BlogCate" + index}
                    onClick={() => onSelected(index)}
                  >
                    <CommonPill className="clickable small active">
                      {cat.name}
                    </CommonPill>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </FilterStyles>
    </BlogFilterStyles>
  )
}

export default BlogFilter
