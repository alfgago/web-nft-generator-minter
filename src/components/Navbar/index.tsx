/* eslint-disable new-cap */
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { ReactSVG } from "react-svg"
import { useWindowSize } from "usehooks-ts"
import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

import Login from "../Login"
import { usePaperSDKContext } from "../PaperSDKProvider"
import SearchBar from "../SearchBar"

import { NavbarStyles } from "./NavbarStyles"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { paperSdk, setUser, user } = usePaperSDKContext()
  const { width } = useWindowSize()
  const { isConnected } = useAccount()

  const { data: session, status } = useSession()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const loginWithPaper = async () => {
    // @ts-ignore
    const login = await paperSdk.auth.loginWithPaperModal()
    setUser(login.user)
    window.location.reload()
  }

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
    <NavbarStyles hasColor={color} id="navbar" className="navbar">
      <div className={`content ${showMenu ? "is-active" : ""}`}>
        <Link legacyBehavior href="/">
          <a className="logo">
            <img
              src="/assets/img/p1-logo.svg"
              alt="plusOne Logo"
              width="113px"
              height="75px"
            />
          </a>
        </Link>
        <div className="search-bar">
          <SearchBar />
        </div>
        <nav className="nav">
          <ul>
            <li className="has-submenu">
              <a href="#">Explore</a>
              <div className="submenu">
                <ul>
                  <li>
                    <Link legacyBehavior href="/artists">
                      <a>By Artists</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/passes">
                      <a>By Passes</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/events">
                      <a>By Events</a>
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
                    <Link href="/resources/fans">For Fans</Link>
                  </li>
                  <li>
                    <Link href="/resources/artists">For Artists</Link>
                  </li>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/resources/blog">Blog</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="has-submenu">
              {width > 1080 ? (
                <ReactSVG src="/assets/icons/account.svg" />
              ) : (
                <a href="">Account</a>
              )}
              <div className="submenu">
                <ul>
                  {session && (
                    <li className="li-account">
                      <Link href="/profile">Profile</Link>
                    </li>
                  )}
                  {session && (
                    <li className="li-account">
                      <Link href="/tour-manager">Manager</Link>
                    </li>
                  )}
                  {isConnected && (
                    <li className="li-account">
                      <Link href="/my-passes">
                        <span>My Passes</span>
                      </Link>
                    </li>
                  )}
                  {!isConnected && (
                    <>
                      <li className="li-wallet">
                        <a href="#" onClick={() => loginWithPaper()}>
                          <span>Connect with Email</span>
                        </a>
                      </li>
                      <li className="li-wallet">
                        <a href="#" onClick={() => connect()}>
                          Log in with Metamask
                        </a>
                      </li>
                    </>
                  )}

                  {!session && (
                    <li className="li-account">
                      <a href="#" onClick={() => setOpenLogin(true)}>
                        <span>Manager Login</span>
                      </a>
                    </li>
                  )}
                  {session && (
                    <li className="li-account">
                      <a href="#" onClick={() => signOut()}>
                        <span>Logout</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </li>
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
