import Head from "next/head"

import Home from "@/components/Home"

const Index = () => {
  return (
    <>
      <Head>
        <title>Home - PlusOne</title>
      </Head>
      <Home />
    </>
  )
}

export const getStaticProps = async () => {
  // const { data } = await axios.get(`http://localhost:3000/api/timeline`)
  return {
    props: {
      data: false,
    },
    revalidate: 30,
  }
}

export default Index
