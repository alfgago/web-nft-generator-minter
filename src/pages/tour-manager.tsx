import React from "react"
import Head from "next/head"
import { ThirdwebProvider, useUser } from "@thirdweb-dev/react"

import Tours from "@/components/Tours"
import TourManagerLogin from "@/components/Tours/TourManagerLogin"

const TourManagerPage = () => {
  const { user, isLoading } = useUser()
  const title = "Manager"

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>{title} - PlusOne</title>
        <meta name="robots" content="noindex" />
      </Head>

      {user ? <Tours /> : <TourManagerLogin />}
    </>
  )
}

TourManagerPage.requireAuth = true

const TourManagerPageWrapper = () => (
  <ThirdwebProvider>
    <TourManagerPage />
  </ThirdwebProvider>
)

export default TourManagerPageWrapper
