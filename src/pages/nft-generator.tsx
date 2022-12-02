import Head from "next/head"
import axios from "axios"

import NftBuilder from "@/components/NftBuilder"

const BuilderPage = ({ data }: any) => {
  return (
    <>
      <Head>
        <title>NFT Builder - PlusOne</title>
      </Head>
      <NftBuilder artists={data} />
    </>
  )
}

export default BuilderPage

export const getServerSideProps = async () => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const postResponse = await axios.get(`${apiURL}/api/artists?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (postResponse.data) {
    return {
      props: {
        data: postResponse.data.data,
      },
    }
  }
}
