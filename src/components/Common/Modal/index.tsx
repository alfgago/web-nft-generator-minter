import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { ReactSVG } from "react-svg"

import GradientBackground from "../GradientBackground"

import { ModalStyles } from "./ModalStyles"

const FadeModal = ({
  children,
  setIsOpen,
  title,
  className = "",
}: {
  children: JSX.Element
  setIsOpen: any
  title: string
  className: string
}) => {
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ModalStyles className={`${fadeIn ? "show" : "hide"} ${className}`}>
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
              <ReactSVG src="/assets/icons/close.svg" />
            </div>
          </div>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </ModalStyles>
  )
}

const Modal = ({ children, setIsOpen, title, className }: any) => {
  return (
    <>
      {createPortal(
        <FadeModal setIsOpen={setIsOpen} title={title} className={className}>
          {children}
        </FadeModal>,
        document.getElementById("portal") as HTMLElement
      )}
    </>
  )
}

export default Modal
