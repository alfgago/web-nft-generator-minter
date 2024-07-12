import Head from "next/head"
import { useUser, useAuth } from "@thirdweb-dev/react"
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

  // Use Thirdweb's `getUser` method to get the current user session
  const { getUser } = useAuth()
  const user = await getUser(req)

  if (!user) {
    return {
      redirect: {
        destination: "/manager-login",
        permanent: false,
      },
    }
  }

  const { data } = await axios.get(
    `${domain}/api/artists/managed/?user=${user.id}`
  )
  const artists = data

  if (artists) {
    return {
      props: {
        data: artists,
      },
    }
  }
}
