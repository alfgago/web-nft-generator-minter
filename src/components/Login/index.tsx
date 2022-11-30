import React, { useEffect, useState } from "react"

import LoginModal from "../Common/Modal"

import LoginForm from "./LoginForm"

const Login = ({ setIsOpen }: any) => {
  return (
    <>
      <LoginModal setIsOpen={setIsOpen} title={"Log in"}>
        <LoginForm setIsOpen={setIsOpen} />
      </LoginModal>
    </>
  )
}

export default Login
