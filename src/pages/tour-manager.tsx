import React from "react"
import Head from "next/head"
import { getSession } from "next-auth/react"

import Tours from "@/components/Tours"
import TourManagerLogin from "@/components/Tours/TourManagerLogin"

const TourManagerPage = ({ user }: any) => {
  const title = "Manager"

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

export const getServerSideProps = async ({ req }: any) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/manager-login",
        permanent: false,
      },
    }
  }
  return {
    props: {
      user: session,
    },
  }
}

export default TourManagerPage
