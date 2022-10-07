import React, { useState } from "react"
import Link from "next/link"

import { HeaderStyled, NavStyled } from "./NavbarStyles"
// import './Navbar.css'

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
    <HeaderStyled hasColor={color}>
      <NavStyled>
        <div className="logoSearch">
          <Link href="/">
            <a className="logo">
              <img src="/assets/img/plus-one-logo.png" alt="plusOne" />
            </a>
          </Link>
          <input type="text" className="searchInput" />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="#testimonials" onClick={closeMenu}>
              LOGIN
            </a>
          </li>
          <li className="nav-item">
            <a href="#demo" onClick={closeMenu}>
              <img src="/assets/img/meta-mask-logo.png" alt="Metamask" />
            </a>
          </li>
        </ul>
      </NavStyled>
    </HeaderStyled>
  )
}

export default Navbar
