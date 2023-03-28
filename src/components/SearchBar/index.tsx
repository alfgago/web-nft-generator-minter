/* eslint-disable camelcase */
import React, { Component, createRef, RefObject } from "react"
import Link from "next/link"
import algoliasearch from "algoliasearch/lite"
import {
  Configure,
  connectHits,
  connectSearchBox,
  Index,
  InstantSearch,
} from "react-instantsearch-dom"

import DebouncedSearchBox from "./DebouncedSearchBox"
import SearchBarStyles from "./SearchBarStyles"

const CustomSearchBox = connectSearchBox(DebouncedSearchBox)

const toggleSearchBar = (active: boolean) => {
  if (active) {
    const searchBar = document.getElementById("support-search-bar")
    if (searchBar) {
      searchBar.classList.add("active")
      const input = document.querySelector<HTMLInputElement>(
        "#support-search-bar input"
      )
      if (input) {
        input.focus()
      }
    }
  } else {
    const searchBar = document.getElementById("support-search-bar")
    if (searchBar) {
      searchBar.classList.remove("active")
    }
  }
}

class SearchBar extends Component {
  wrapperRef: RefObject<HTMLDivElement>

  constructor(props: any) {
    super(props)

    this.wrapperRef = createRef<HTMLDivElement>()
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  handleClickOutside(event: MouseEvent) {
    if (
      this.wrapperRef &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target as Node)
    ) {
      toggleSearchBar(false)
    }
  }

  render() {
    const searchClient = algoliasearch(
      "FSCKGMDNFV",
      "b45c70779e60e9f4d008d0066139d1f1"
    )

    return (
      <SearchBarStyles ref={this.wrapperRef} id="support-search-bar">
        <InstantSearch
          indexName="production_api::pass.pass"
          searchClient={searchClient}
        >
          <div id="search-bar" onClick={() => toggleSearchBar(true)}>
            <CustomSearchBox />
          </div>
          <div className="results-box">
            <div className="results">
              <Index indexName="production_api::artist.artist">
                <Configure hitsPerPage={5} />
                <CustomHits />
              </Index>
              <Index indexName="production_api::pass.pass">
                <Configure hitsPerPage={3} />
                <CustomHits />
              </Index>
              <Index indexName="production_api::event.event">
                <Configure hitsPerPage={3} />
                <CustomHits />
              </Index>
            </div>
          </div>
        </InstantSearch>
      </SearchBarStyles>
    )
  }
}

const Hits = ({ hits }: any) => {
  return (
    <>
      {hits.map((hit: any) => (
        <div key={hit.objectID} className="hit-result">
          {hit.collection_name && <PassHit hit={hit} />}
          {hit.bio && <ArtistHit hit={hit} />}
          {hit.country && <EventHit hit={hit} />}
        </div>
      ))}
    </>
  )
}

const PassHit = ({ hit }: any) => {
  return (
    <Link href={"/pass/" + hit?.contract_address}>
      <span className="type">Pass </span>
      <div className="res">{hit?.collection_name}</div>
    </Link>
  )
}

const ArtistHit = ({ hit }: any) => {
  return (
    <Link href={"/artist/" + hit?.slug}>
      <span className="type">Artist </span>
      <div className="res">{hit?.name}</div>
    </Link>
  )
}

const EventHit = ({ hit }: any) => {
  return (
    <Link href={"/"}>
      <span className="type">Show </span>
      <div className="res">
        {hit?.name} - {hit?.city}, {hit?.country} - {dateFormat(hit?.date)}
      </div>
    </Link>
  )
}

const CustomHits = connectHits(Hits)

const dateFormat = (value: any) => {
  const date = new Date(value)
  const day = date.toLocaleString("default", { day: "2-digit" })
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.toLocaleString("default", { year: "numeric" })
  return day + " " + month + " " + year
}

export default SearchBar
