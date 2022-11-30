import React from "react"
import Head from "next/head"
import { getSession, useSession } from "next-auth/react"
import axios from "axios"

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

TourMangerPage.requireAuth = false

export default TourMangerPage
