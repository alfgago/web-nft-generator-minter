import React from "react"

import SimpleHeader from "@/components/Common/SimpleHeader"
import LoginForm from "@/components/Login/LoginForm"

import { TourManagerLoginStyles } from "./TourManagerLoginStyles"

const TourManagerLogin = () => {
  return (
    <TourManagerLoginStyles>
      <SimpleHeader
        title="Tour Manager"
        backgroundColor="blue"
        textAlign="center"
      />
      <section>
        <div className="content">
          <h2>Login</h2>
          <LoginForm />
        </div>
      </section>
    </TourManagerLoginStyles>
  )
}

export default TourManagerLogin
