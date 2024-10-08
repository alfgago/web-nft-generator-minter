import Head from "next/head"
import axios from "axios"

import Resources from "@/components/Resources"

const FanResources = ({ page }: any) => {
  return (
    <>
      <Head>
        <title>Fan Resources - PlusOne</title>
      </Head>
      <Resources title="For Fans:" data={page.data} style="fans" />
    </>
  )
}

export const getStaticProps = async () => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const postResponse = await axios.get(
    `${apiURL}/api/fan-resource?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return {
    props: {
      page: postResponse.data,
    },
    revalidate: 30,
  }
}

export default FanResources
