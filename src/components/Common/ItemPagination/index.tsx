import CollectionItem from "@/components/Tours/NftCollections/CollectionItem"
import React from "react"
import { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"

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
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default ItemPagination
