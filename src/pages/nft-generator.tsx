import Head from "next/head"
import { getSession } from "next-auth/react"
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

BuilderPage.requireAuth = true

export const getServerSideProps = async ({ req }: any) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"

  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/manager-login",
        permanent: false,
      },
    }
  }

  // @ts-ignore
  const { data } = await axios.get(domain + `/api/artists?user=${session.id}`)
  const artists = data.data

  if (artists) {
    return {
      props: {
        data: artists,
      },
    }
  }
}
