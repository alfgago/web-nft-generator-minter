import React, { useEffect, useState } from "react"

import Footer from "../Footer"
import Navbar from "../Navbar"

import LoginForm from "./LoginForm"
import LoginModal from "./LoginModal"

const Login = ({ setIsOpen }: any) => {
  const [isMobile, setMobile] = useState(false)
  const [logLink, setLogLink] = useState("#Account")

  const updateMedia = () => {
    if (window.innerWidth < 1080) {
      setMobile(true)
      setLogLink("/loginMobile")
    } else {
      setMobile(false)
    }
  }

  useEffect(() => {
    if (window.innerWidth < 1080) {
      setMobile(true)
      setLogLink("/loginMobile")
    } else {
      setMobile(false)
    }

    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })

  return (
    <>
      <LoginModal setIsOpen={setIsOpen}>
        <LoginForm />
      </LoginModal>
    </>
  )
}

export default Login
