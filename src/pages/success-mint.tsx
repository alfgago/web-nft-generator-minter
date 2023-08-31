import React from "react"
import Head from "next/head"

const Index = () => {
  return (
    <>
      <Head>
        <title>Mint Successful</title>
        <meta name="robots" content="noindex" />
      </Head>
      Test Callback
    </>
  )
}

export default Index

export async function getServerSideProps(context) {
  const { query } = context.req
  console.log(context.req)
  // Assuming the parameter you're expecting is named 'paramName'
  const paramNameValue = query.paramName

  return {
    props: {
      page: null,
    },
  }
}
