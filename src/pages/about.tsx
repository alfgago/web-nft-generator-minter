import React from "react"
import Head from "next/head"

import About from "@/components/About"

const AboutPage = ({ page }: any) => {
  return (
    <>
      <Head>
        <title>About - PlusOne</title>
      </Head>
      <About page={page} />
    </>
  )
}

export const getStaticProps = async () => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const postResponse = {
    id: 1,
    banner_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolores possimus ratione? Odio, facilis! Corrupti magni voluptatum eius, aspernatur officia dicta maxime quod at quaerat id, error dolore ipsum perferendis.",
  }

  return {
    props: {
      page: postResponse,
    },
    revalidate: 30,
  }
}

export default AboutPage
