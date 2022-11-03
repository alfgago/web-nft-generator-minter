import CollectionItem from "@/components/Tours/NftCollections/CollectionItem"
import React from "react"
import { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import { Pagination } from "../CommonStyles"

const ItemPagination = ({ itemsPerPage, values, children }: any) => {
  const items = [...values]

  const [currentItems, setCurrentItems] = useState(items)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage

    setCurrentItems(items.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(items.length / itemsPerPage))
  }, [itemOffset, itemsPerPage])

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    setItemOffset(newOffset)
  }

  return (
    <>
      {
        (children = React.Children.map(children, (child) => {
          return React.cloneElement(child, { currentItems })
        }))
      }
      <Pagination>
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          nextLabel=">"
          previousLabel="<"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakLabel="..."
          containerClassName="pagination"
          activeLinkClassName="active"
          renderOnZeroPageCount={null}
          // marginPagesDisplayed={2}
          // pageClassName="page-item"
          // previousClassName="page-item"
          // nextClassName="page-item"
          // breakClassName="page-item"
          // breakLinkClassName="page-link"
        />
      </Pagination>
    </>
  )
}

export default ItemPagination
