import React from "react"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"

import CollectionItem from "@/components/Tours/NftCollections/CollectionItem"

import { Pagination } from "../CommonStyles"

/* three props
itemsPerPage: amount of items per page
values: the values of each item in the collection
children: the component that create the items inside the pagination
*/
const ItemPagination = ({ itemsPerPage, values, children }: any) => {
  const items = values ? [...values] : ""

  const [currentItems, setCurrentItems] = useState(items)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  // handdle the current items and the number of the page
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage

    setCurrentItems(items.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(items.length / itemsPerPage))
  }, [itemOffset, itemsPerPage])

  // handle the click on the page
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    setItemOffset(newOffset)
  }

  return (
    <>
      {
        (children = React.Children.map(children, (child) => {
          // use the currentItems var not the data that is received as a prop
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
        />
      </Pagination>
    </>
  )
}

export default ItemPagination
