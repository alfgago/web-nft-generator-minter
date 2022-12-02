import Head from "next/head"
import axios from "axios"

import PassListing from "@/components/PassListing"

const Nfts = ({ passes }: any) => {
  return (
    <>
      <Head>
        <title>Pass Collections - PlusOne</title>
      </Head>
      <PassListing passes={passes.data} />
    </>
  )
}

Nfts.requireAuth = false

export default Nfts

export const getServerSideProps = async () => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const passesResponse = await axios.get(`${apiURL}/api/passes?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: {
      passes: passesResponse.data,
    },
  }
}
