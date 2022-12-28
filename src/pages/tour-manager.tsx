import React from "react"
import Head from "next/head"
import { getSession } from "next-auth/react"

import Tours from "@/components/Tours"
import TourManagerLogin from "@/components/Tours/TourManagerLogin"

const TourManagerPage = ({ user }: any) => {
  const title = "Tour Manager"

  console.log(user)

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

TourManagerPage.requireAuth = false

export const getServerSideProps = async ({ req }: any) => {
  const session = await getSession({ req })
  return {
    props: {
      user: session,
    },
  }
}

export default TourManagerPage
