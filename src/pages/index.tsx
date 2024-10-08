import React from "react"
import Head from "next/head"
import { ThirdwebProvider, useContract, useContractRead } from "@thirdweb-dev/react"

import Home from "@/components/Home"

const Index = ({ page }: any) => {
  return (
    <ThirdwebProvider>
      <Head>
        <title>Home - PlusOne Music</title>
      </Head>
      <Home page={page.data} />
    </ThirdwebProvider>
  )
}

export const getStaticProps = async () => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const postResponse = await fetch(
    `${apiURL}/api/homepage?populate=deep,4`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await postResponse.json()

  return {
    props: {
      page: data,
    },
    revalidate: 30,
  }
}

export default Index
