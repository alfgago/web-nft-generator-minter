import React from "react"
import Head from "next/head"
import { ReactSVG } from "react-svg"
import Tours from "@/components/Tours"
var stylingObject = {
  div: {
    background: "blue",
    padding: "4rem 0rem",
    display: "flex",
    justifyContent: "center",
  },
  h1: {
    color: "white",
  },
}

const TourMangerPage = () => {
  const title = "Tour Manager"
  return (
    <>
      <Head>
        <title>{title} - PlusOne</title>
      </Head>

      {/* Need to be replaced with the gradient component */}
      <div style={stylingObject.div}>
        <h1 style={stylingObject.h1}>Manager</h1>
      </div>
      <Tours />
      {/* add the collections component */}
    </>
  )
}

export default TourMangerPage
