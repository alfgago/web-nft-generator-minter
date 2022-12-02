import Head from "next/head"
import axios from "axios"

import Home from "@/components/Home"

const Index = ({ page, nfts, passes }: any) => {
  return (
    <>
      <Head>
        <title>Home - PlusOne</title>
      </Head>
      <Home page={page.data} nfts={nfts.data} passes={passes.data} />
    </>
  )
}

export const getStaticProps = async () => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const postResponse = await axios.get(
    `${apiURL}/api/homepage?populate[banner]=true&populate[featured_artists][populate][0]=profile_picture`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const nftsResponse = await axios.get(`${apiURL}/api/nfts?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const passesResponse = await axios.get(`${apiURL}/api/passes?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: {
      page: postResponse.data,
      nfts: nftsResponse.data,
      passes: passesResponse.data,
    },
    revalidate: 30,
  }
}

export default Index
