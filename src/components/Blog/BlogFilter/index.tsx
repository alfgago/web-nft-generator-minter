import React from "react"

import { FilterStyles } from "@/components/Blog/BlogFilter/BlogFilterStyles"

import { CommonPill } from "../../Common/CommonStyles"

import { BlogFilterStyles } from "./BlogFilterStyles"

const BlogFilter = () => {
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
                <li>
                  <CommonPill className="clickable small active">
                    All
                  </CommonPill>
                </li>
                <li>
                  <CommonPill className="clickable small">Tour Pass</CommonPill>
                </li>
                <li>
                  <CommonPill className="clickable small">
                    Single Event
                  </CommonPill>
                </li>
                <li>
                  <CommonPill className="clickable small">Lottery</CommonPill>
                </li>
                <li>
                  <CommonPill className="clickable small">Lifetime</CommonPill>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </FilterStyles>
    </BlogFilterStyles>
  )
}

export default BlogFilter
