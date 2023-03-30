import Head from "next/head"
import axios from "axios"

import Blog from "@/components/Blog"

const Resources = ({ blogsData }: any) => {
  return (
    <>
      <Head>
        <title>Blog - PlusOne</title>
      </Head>
      <Blog allBlogs={blogsData} />
    </>
  )
}

export const getServerSideProps = async ({ query }: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const response = await axios.get(`${apiURL}/api/blog-posts?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.data) {
    return {
      props: {
        blogsData: response.data.data,
      },
    }
  }
}

export default Resources
