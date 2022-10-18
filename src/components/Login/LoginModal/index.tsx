import React from "react"

import { LoginModalStyles } from "./LoginModalStyles"
const LoginModal = ({
  children,
  setIsOpen,
}: {
  children: JSX.Element
  setIsOpen: any
}) => {
  return (
    <LoginModalStyles>
      <div
        className="bg-modal"
        onClick={() => {
          setIsOpen(false)
        }}
       />

      <div className="modal-container">
        <div className="modal-header container-centered">
          <h2 className="title">Log in</h2>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </LoginModalStyles>
  )
}

export default LoginModal
