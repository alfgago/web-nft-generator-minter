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
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token =
    "2a4d4c08521bc5ebc83615087b3a1d6f6a884c924f6ccce4807f7c00651cbcf20afeb18246d9c6d2d8fe0092753bcbdf4a56e7c989425e038b2f2cd51cb0871a50b2d7733cdbff0c25aa5fdcfac2c01d7fc20a0f85d219858476fca335a1050da3fd2911783511d130e5b7cddb6b153315dc6664096959563375ed42dca989d8"
  // const token = process.env.API_TOKEN
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const getResponse = await axios.get(
    `http://localhost:1337/api/about?populate=deep,3`
  )

  // const getResponse = await axios.get(
  //   `${process.env.NEXT_PUBLIC_DOMAIN}/api/about?populate=deep,3`
  // )

  return {
    props: {
      page: getResponse.data,
    },
    revalidate: 30,
  }
}

export default AboutPage
