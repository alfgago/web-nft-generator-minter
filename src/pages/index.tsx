import Head from 'next/head'
import Home from "@/components/Home"
import axios from "axios"

const Index = ({data}:any) => {
  console.log(data);
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
  const { data } = await axios.get(`http://localhost:3000/api/timeline`)
  return {
    props: {
      data,
    },
    revalidate: 30,
  }
}

export default Index;