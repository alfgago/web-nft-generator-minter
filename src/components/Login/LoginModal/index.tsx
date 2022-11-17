import React from "react"
import { ReactSVG } from "react-svg"

import { LoginModalStyles } from "./LoginModalStyles"

const LoginModal = ({
  children,
  setIsOpen,
  title = "Log in",
}: {
  children: JSX.Element
  setIsOpen: any
  title: string
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
          <div>
            <h2 className="title">{title}</h2>
          </div>
          <div>
            <div className="close-mobile" onClick={() => setIsOpen(false)}>
              <ReactSVG src="/assets/vectors/close.svg" />
            </div>
          </div>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </LoginModalStyles>
  )
}

export default LoginModal
