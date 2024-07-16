import React from "react"
import Head from "next/head"
import { getSession } from "next-auth/react"
"
import { ThirdwebProvider, useUser } from "@thirdweb-dev/react"

import TourManagerLogin from "@/components/Tours/TourManagerLogin"

const TourManagerPage = () => {
  const { user } = useUser()
  const title = "Login"

  return (
    <ThirdwebProvider>
      <Head>
        <title>{title} - PlusOne</title>
        <meta name="robots" content="noindex" />
      </Head>

      <TourManagerLogin />
    </ThirdwebProvider>
  )
}

TourManagerPage.requireAuth = false

export const getServerSideProps = async ({ req }: any) => {
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: {
        destination: "/tour-manager",
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
