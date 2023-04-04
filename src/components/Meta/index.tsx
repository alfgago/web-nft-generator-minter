import React from "react"
import Head from "next/head"

interface MetaProps {
  title?: string
  description?: string
  image?: string
}

const Meta: React.FC<MetaProps> = ({
  title = "PlusOne",
  description = "Buy, sell, and win guest list access from your favorite artists",
  image = "https://plusonemusic.io/assets/img/screenshot.jpg",
}) => {
  const urlLink = "https://plusonemusic.io"
  const keyWords = "plusone, nft, pass"

  return (
    <Head>
      <title>{title}</title>
      {<meta name="description" content={description} />}
      {image && <meta name="image" content={image} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content={title} />
      <meta name="keywords" content={keyWords} />
      {/* LINKS */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="shortcut icon" href="/favicon.ico" />
      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={urlLink} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  )
}
export default Meta
