import Head from 'next/head'
import About from "@/components/About"
import axios from "axios"

const AboutPage = ({data}:any) => {
  console.log(data);
  return (
    <>
      <Head>
        <title>About - PlusOne</title>
      </Head>
      <About />
    </>
  )
}

export default AboutPage;