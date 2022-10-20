import React, { useState, useEffect } from "react"
import LoginModal from "./LoginModal"
import LoginForm from "./LoginForm"
import Navbar from "../Navbar"
import Footer from "../Footer"

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
      {isMobile && <Navbar />}
      <LoginModal setIsOpen={setIsOpen}>
        <LoginForm />
      </LoginModal>
      {isMobile && <Footer />}
    </>
  )
}

export default Login
