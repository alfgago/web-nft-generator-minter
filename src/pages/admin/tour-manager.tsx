import React from "react"
import Head from "next/head"

import Tours from "@/components/Tours"

const TourMangerPage = () => {
  const title = "Tour Manager"
  return (
    <>
      <Head>
        <title>{title} - PlusOne</title>
      </Head>
      <Tours />
    </>
  )
}

export default TourMangerPage
