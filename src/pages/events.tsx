import React from "react"
import Head from "next/head"

import EventListing from "@/components/EventListing"

const Events = () => {
  return (
    <>
      <Head>
        <title>Events - PlusOne</title>
      </Head>
      <EventListing />
    </>
  )
}

export default Events
