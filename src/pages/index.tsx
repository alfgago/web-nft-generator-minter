import Head from "next/head"
import axios from "axios"

import Home from "@/components/Home"

const Index = ({ page, passes }: any) => {
  return (
    <>
      <Head>
        <title>Home - PlusOne</title>
      </Head>
      <Home page={page.data} passes={passes.data} />
    </>
  )
}

export const getStaticProps = async () => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const postResponse = await axios.get(`${apiURL}/api/homepage?populate=deep,4`)

  const passesResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/passes?populate=*`
  )

  return {
    props: {
      page: postResponse.data,
      passes: passesResponse.data,
    },
    revalidate: 30,
  }
}

export default Index
