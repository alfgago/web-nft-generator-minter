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

    roadMap: {
      column_data_1: [
        {
          date: "January 2023",
          title: "Plus|One MVP launch",
          description:
            "Thanks to everyone for helping launch plus|one, a platform dedicated to providing new tools for artists to succeed in the coming digital revolution which puts more control in the hands of creatives and less to content-controlling corporations.",
        },
        {
          date: "January 2023",
          title: "Plus|One MVP launch",
          description:
            "Publicly show off your collection of digital passes by making it on our platform leaderboard.",
        },
        {
          date: "January 2023",
          title: "Plus|One MVP launch",
          description:
            "Thanks to everyone for helping launch plus|one, a platform dedicated to providing new tools for artists to succeed in the coming digital revolution which puts more control in the hands of creatives and less to content-controlling corporations.",
        },
      ],
      column_data_2: [
        {
          date: "January 2023",
          title: "Plus|One MVP launch",
          description:
            "Thanks to everyone for helping launch plus|one, a platform dedicated to providing new tools for artists to succeed in the coming digital revolution which puts more control in the hands of creatives and less to content-controlling corporations.",
        },
        {
          date: "January 2023",
          title: "Plus|One MVP launch",
          description:
            "Publicly show off your collection of digital passes by making it on our platform leaderboard.",
        },
        {
          date: "January 2023",
          title: "Plus|One MVP launch",
          description:
            "Thanks to everyone for helping launch plus|one, a platform dedicated to providing new tools for artists to succeed in the coming digital revolution which puts more control in the hands of creatives and less to content-controlling corporations.",
        },
      ],
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
