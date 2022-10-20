import React, { useState } from "react"
import Link from "next/link"
import { ReactSVG } from "react-svg"

import Login from "../Login"

import { NavbarStyles } from "./NavbarStyles"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)

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

  const [openLogin, setIsOpen] = useState(false)

  return (
    <NavbarStyles hasColor={color}>
      <div className={`content ${showMenu ? "is-active" : ""}`}>
        <Link href="/">
          <a className="logo">
            <img src="/assets/img/plus-one-logo.png" alt="plusOne" />
          </a>
        </Link>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by artist, venue, or city"
          />
          <ReactSVG src="/assets/vectors/search.svg" />
        </div>
        <nav className="nav">
          <ul>
            <li className="has-submenu">
              <a href="#">Explore</a>
              <div className="submenu">
                <ul>
                  <li>
                    <Link href="/artists">
                      <a>By Artists</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/artists">
                      <a>By NFTs</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="has-submenu">
              <a href="#">Resources</a>
              <div className="submenu">
                <ul>
                  <li>
                    <Link href="/">
                      <a>For Fans</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>For Artists</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>Blog</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#account" onClick={() => setIsOpen(true)}>
                <ReactSVG src="/assets/vectors/account.svg" />
              </a>
              {openLogin && <Login setIsOpen={setIsOpen} />}
            </li>
            <li>
              <a href="#">
                <ReactSVG src="/assets/vectors/wallet.svg" />
              </a>
            </li>
          </ul>
        </nav>
        <button
          className={`hamburger hamburger--elastic ${
            showMenu ? "is-active" : ""
          }`}
          type="button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
    </NavbarStyles>
  )
}

export default Navbar
