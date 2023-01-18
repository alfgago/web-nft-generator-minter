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
    goal: {
      title: "Our Goal",
      description:
        "To bring the fan into the fold by allowing them to make the critical decisions on our technical roadmap, while opening the door to become partners in the products and profits. The new wave of digital music products will be community (not corporation) controlled.",
    },
    help_artists: {
      title: "Help Artists",
      description:
        "Once plus|one successfully helps artists build their tokenized communities, we plan to create impactful metaverse promotion and production tools to satisfy even the most die-hard live music fan.",
    },
  }

  return {
    props: {
      page: postResponse,
    },
    revalidate: 30,
  }
}

export default AboutPage
