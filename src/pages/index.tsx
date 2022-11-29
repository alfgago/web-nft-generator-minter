import Head from "next/head"
import axios from "axios"

import Home from "@/components/Home"

const Index = ({ page }: any) => {
  return (
    <>
      <Head>
        <title>Home - PlusOne</title>
      </Head>
      <Home data={page.data} />
    </>
  )
}

export const getStaticProps = async () => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const postResponse = await axios.get(`${apiURL}/api/homepage?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: {
      page: postResponse.data,
    },
    revalidate: 30,
  }
}

export default Index
