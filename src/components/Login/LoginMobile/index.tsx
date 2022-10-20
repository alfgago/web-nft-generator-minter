import React from "react"
import LoginForm from "../LoginForm"
import MobileTittle from "@/components/Login/LoginMobile/MobileTittle"
import Navbar from "@/components/Navbar"
import { LoginMobilelStyles } from "./LoginMobileStyle"
const LoginMobile = () => {
  return (
    <LoginMobilelStyles>
      <Navbar></Navbar>

      <MobileTittle>
        <LoginForm />
      </MobileTittle>
    </LoginMobilelStyles>
  )
}

export default LoginMobile
