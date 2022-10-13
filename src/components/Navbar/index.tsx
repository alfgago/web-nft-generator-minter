import React, { useState } from "react"
import Link from "next/link"

import { NavbarStyles } from "./NavbarStyles"

const Navbar = () => {
  const [click, setClick] = useState(false)
  const closeMenu = () => setClick(false)

  // change nav color when scrolling
  const [color, setColor] = useState(false)
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true)
    } else {
      setColor(false)
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeColor)
  }

  return (
    <NavbarStyles hasColor={color}>
      <Link href="/">
        <a className="logo">
          <img src="/assets/img/plus-one-logo.png" alt="plusOne" />
        </a>
      </Link>
      <nav className="nav">
        <ul>
          <li className="search-li">
            <input
              type="text"
              className="search-input"
              placeholder="Search by artist, venue, or city"
            />
            <img src="/assets/img/search.svg" alt="search icon" />
          </li>
          <li>
            <Link href="/artists">
              <a>Artists</a>
            </Link>
          </li>
          <li>
            <Link href="/resources">
              <a>Resources</a>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="right-nav">
        <ul>
          <li>
            <Link href="/">
              <a>Account</a>
            </Link>
          </li>
          <li className="nav-item">
            <a href="#">
              <img src="/assets/img/meta-mask-logo.png" alt="Metamask" />
            </a>
          </li>
        </ul>
      </nav>
    </NavbarStyles>
  )
}

export default Navbar
