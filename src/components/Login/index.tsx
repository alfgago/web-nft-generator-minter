import React, { useEffect, useState } from "react"

import Footer from "../Footer"
import Navbar from "../Navbar"

import LoginForm from "./LoginForm"
import LoginModal from "./LoginModal"

const Login = ({ setIsOpen }: any) => {
  return (
    <>
      <LoginModal setIsOpen={setIsOpen}>
        <LoginForm setIsOpen={setIsOpen} />
      </LoginModal>
    </>
  )
}

export default Login
