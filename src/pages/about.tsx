import React from "react"
import Head from "next/head"
import axios from "axios"

import About from "@/components/About"

const AboutPage = ({ page }: any) => {
  return (
    <>
      <Head>
        <title>About - PlusOne</title>
      </Head>
      <About page={page.data} />
    </>
  )
}

export const getStaticProps = async () => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const postResponse = await axios.get(`${apiURL}/api/about?populate=deep,4`)

  return {
    props: {
      page: postResponse.data,
    },
    revalidate: 1,
  }
}

export default AboutPage
