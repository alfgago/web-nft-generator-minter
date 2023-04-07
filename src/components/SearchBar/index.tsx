/* eslint-disable camelcase */
import React, {
  Component,
  createRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import Link from "next/link"
import algoliasearch from "algoliasearch/lite"
import {
  Configure,
  connectHits,
  connectSearchBox,
  Index,
  InstantSearch,
} from "react-instantsearch-dom"
import { ReactSVG } from "react-svg"

import dateFormat from "@/utils/dateFunctions"

import DebouncedSearchBox from "./DebouncedSearchBox"
import SearchBarStyles from "./SearchBarStyles"

const CustomSearchBox = connectSearchBox(DebouncedSearchBox)

const SearchBar = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [toggleSearch, setToggleSearch] = useState(false)

  const toggleSearchBar = (active: boolean) => {
    if (active) {
      const searchBar = document.getElementById("support-search-bar")
      if (searchBar) {
        searchBar.classList.add("active")
        const input = document.getElementById("auto-focus-search")
        if (input) {
          input.focus()
        }
      }
      setToggleSearch(true)
    } else {
      const searchBar = document.getElementById("support-search-bar")
      if (searchBar) {
        searchBar.classList.remove("active")
      }
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef &&
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      toggleSearchBar(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const searchClient = algoliasearch(
    "FSCKGMDNFV",
    "b45c70779e60e9f4d008d0066139d1f1"
  )

  return (
    <SearchBarStyles ref={wrapperRef} id="support-search-bar">
      {!toggleSearch ? (
        <div id="search-bar untoggled" onClick={() => toggleSearchBar(true)}>
          <div className="search-field">
            <input placeholder="Search by artist, venue, or city..." />
            <ReactSVG className="icon" src="/assets/icons/search.svg" />
          </div>
        </div>
      ) : (
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
      )}
    </SearchBarStyles>
  )
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

export default SearchBar
