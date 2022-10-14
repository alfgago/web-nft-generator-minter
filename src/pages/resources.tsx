import Head from "next/head"

import About from "@/components/About"

const AboutPage = ({ data }: any) => {
  console.log(data)
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
