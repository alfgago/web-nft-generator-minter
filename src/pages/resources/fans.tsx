import Head from "next/head"
import axios from "axios"

import FanResources from "@/components/FanResources"

const Resources = ({ page }: any) => {
  return (
    <>
      <Head>
        <title>Fan Resources - PlusOne</title>
      </Head>
      <FanResources data={page.data} />
    </>
  )
}

export const getStaticProps = async () => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const postResponse = await axios.get(`${apiURL}/api/fan-resource?populate=*`)

  return {
    props: {
      page: postResponse.data,
    },
    revalidate: 30,
  }
}

export default Resources
