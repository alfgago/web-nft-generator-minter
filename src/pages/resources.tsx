import Head from "next/head"

import About from "@/components/About"

const AboutPage = ({ data }: any) => {
  return (
    <>
      <Head>
        <title>Resources - PlusOne</title>
      </Head>
      <About />
    </>
  )
}

export default AboutPage
