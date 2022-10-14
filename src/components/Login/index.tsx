import React from "react"
import LoginModal from "./LoginModal"
import LoginForm from "./LoginForm"
const Login = ({ setIsOpen }: any) => {
  return (
    <LoginModal setIsOpen={setIsOpen}>
      <LoginForm />
    </LoginModal>
  )
}

export default Login
