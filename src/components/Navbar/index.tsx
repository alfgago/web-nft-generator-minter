import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ReactSVG } from "react-svg"
import { useWindowSize } from "usehooks-ts"
import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

import Login from "../Login"

import { NavbarStyles } from "./NavbarStyles"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { width } = useWindowSize()
  const { isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

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

  const [openLogin, setOpenLogin] = useState(false)

  return (
    <NavbarStyles hasColor={color} id="navbar">
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
                    <Link href="/passes">
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
                    <Link href="/resources/fans">
                      <a>For Fans</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/artists">
                      <a>For Artists</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/blog">
                      <a>Blog</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {width > 1080 && isConnected && (
              <li className="li-account">
                {false && (
                  <a href="#account" onClick={() => setOpenLogin(true)}>
                    <ReactSVG src="/assets/vectors/account.svg" />
                  </a>
                )}
                <Link href="/my-nfts">
                  <a>
                    <ReactSVG src="/assets/vectors/account.svg" />
                  </a>
                </Link>
              </li>
            )}
            {width > 1080 && !isConnected && (
              <li className="li-wallet">
                <a href="#" onClick={() => connect()}>
                  <ReactSVG src="/assets/vectors/wallet.svg" />
                </a>
              </li>
            )}
            {width < 1080 && (
              <li className="has-submenu">
                <a href="#">Account</a>
                <div className="submenu account-submenu">
                  <ul>
                    <li>
                      <a href="#account" onClick={() => setOpenLogin(true)}>
                        <ReactSVG src="/assets/vectors/account.svg" />
                        <span>Account</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => connect()}>
                        <ReactSVG src="/assets/vectors/wallet.svg" />
                        <span>Connect your wallet</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </nav>
        <button
          className={`hamburger hamburger--elastic ${
            showMenu ? "is-active" : ""
          }`}
          type="button"
          onClick={() => {
            setShowMenu(!showMenu)
            showMenu && setOpenLogin(false)
          }}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
      {openLogin && <Login setIsOpen={setOpenLogin} />}
    </NavbarStyles>
  )
}

export default Navbar
