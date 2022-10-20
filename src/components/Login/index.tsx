import React from "react"

import LoginForm from "./LoginForm"
import LoginModal from "./LoginModal"
const Login = ({ setIsOpen }: any) => {
  return (
    <LoginModal setIsOpen={setIsOpen}>
      <LoginForm />
    </LoginModal>
  )
}

export default Login
