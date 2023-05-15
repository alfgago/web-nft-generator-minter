import Head from "next/head"
import axios from "axios"

import Resources from "@/components/Resources"

const ArtistResources = ({ page }: any) => {
  return (
    <>
      <Head>
        <title>Artist Resources - PlusOne</title>
      </Head>
      <Resources title="For Artists:" data={page.data} style="artists" type="1" />
    </>
  )
}

export const getStaticProps = async () => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const postResponse = await axios.get(
    `${apiURL}/api/artist-resource?populate=*`
  )

  return {
    props: {
      page: postResponse.data,
    },
    revalidate: 30,
  }
}

export default ArtistResources
