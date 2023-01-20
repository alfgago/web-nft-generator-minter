import React from "react"
import Head from "next/head"
import axios from "axios"

import About from "@/components/About"

const AboutPage = ({ page, test }: any) => {
  return (
    <>
      <Head>
        <title>About - PlusOne</title>
      </Head>
      <About page={page.data} test={test} />
    </>
  )
}

export const getStaticProps = async () => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token =
    "2a4d4c08521bc5ebc83615087b3a1d6f6a884c924f6ccce4807f7c00651cbcf20afeb18246d9c6d2d8fe0092753bcbdf4a56e7c989425e038b2f2cd51cb0871a50b2d7733cdbff0c25aa5fdcfac2c01d7fc20a0f85d219858476fca335a1050da3fd2911783511d130e5b7cddb6b153315dc6664096959563375ed42dca989d8"
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const getResponse = await axios.get(
    `http://localhost:1337/api/about?populate=deep,3`
  )

  const postResponse = {
    id: 1,
    banner_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolores possimus ratione? Odio, facilis! Corrupti magni voluptatum eius, aspernatur officia dicta maxime quod at quaerat id, error dolore ipsum perferendis.",
    goal: {
      title: " Our Goal ",
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
      test: postResponse,
      page: getResponse.data,
    },
    revalidate: 30,
  }
}

export default AboutPage
