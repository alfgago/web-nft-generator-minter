import React, { useState } from 'react'
import { HeaderStyled, NavStyled } from "./NavbarStyles"
//import './Navbar.css'

const Navbar = () => {

    const [click, setClick] = useState(false)

    const closeMenu = () => setClick(false)

    return (
        <HeaderStyled>
            <NavStyled>
                <a href='/' className='logo'>
                <img src='/resources/img/plus-one-logo.png' alt='plusOne'/>
                </a>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <a href='#testimonials' onClick={closeMenu}>LOGIN</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#demo' onClick={closeMenu}>
                            <img src='/resources/img/meta-mask-logo.png' alt='Metamask'/>
                        </a>
                    </li>
                </ul>
            </NavStyled>
        </HeaderStyled>
    )
}

export default Navbar