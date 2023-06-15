/* eslint-disable new-cap */
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { ReactSVG } from "react-svg"
import { useWindowSize } from "usehooks-ts"
import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

import { PaperEmbeddedWalletSdk } from "@paperxyz/embedded-wallet-service-sdk"

import Login from "../Login"
import SearchBar from "../SearchBar"

import { NavbarStyles } from "./NavbarStyles"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [paperSdk, setPaperSdk] = useState({})
  const { width } = useWindowSize()
  const { isConnected } = useAccount()

  const { data: session, status } = useSession()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {
    const sdk = new PaperEmbeddedWalletSdk({
      clientId:
        process.env.NEXT_PUBLIC_PAPER_TOKEN ||
        "dc69730f-5c2e-42be-8a7c-ec310da0f391",
      // @ts-ignore
      chain: process.env.NEXT_PUBLIC_PAPER_NETWORK || "Goerli",
    })
    console.log("Paper SDK ", sdk)
    setPaperSdk(sdk)
  }, [])

  const loginWithPaper = async () => {
    // @ts-ignore
    const { user } = await paperSdk.auth.loginWithPaperModal()
    alert(
      "Logged in as " +
        user.authDetails.email +
        ", paper wallet is: " +
        user.walletAddress
    )
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
                    <li className="li-account">
                      <a href="#" onClick={() => connect()}>
                        My Passes
                      </a>
                    </li>
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
            {!isConnected && (
              <li className="has-submenu">
                {width > 1080 ? (
                  <ReactSVG src="/assets/icons/wallet.svg" />
                ) : (
                  <a href="">Wallet</a>
                )}
                <div className="submenu">
                  <ul>
                    <li className="li-wallet">
                      <a href="#" onClick={() => connect()}>
                        <img
                          src="/assets/icons/metamask.svg"
                          alt="metamask-icon"
                        />
                        Connect with Metamask
                      </a>
                    </li>
                    <li className="li-wallet">
                      <a href="#" onClick={() => loginWithPaper()}>
                        <img
                          src="/assets/icons/paper-logo-icon.svg"
                          alt="metamask-icon"
                        />
                        <span>Connect with Paper</span>
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
