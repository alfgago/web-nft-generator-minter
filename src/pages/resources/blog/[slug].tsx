import Head from "next/head"
import axios from "axios"

import BlogPost from "@/components/BlogPost"

const ArtistPage = ({ post }: any) => {
  const title = post.attributes.title
  const body = post.attributes.body
  const author = post.attributes.author_name
  const category = post.attributes.category
  const image = post.attributes.featured_image.data.length
    ? post.attributes.featured_image.data[0].attributes
    : null
  const ogTitle = title + " - PlusOne"

  return (
    <>
      <Head>
        <title>{ogTitle}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:image" content={image.url} />
      </Head>
      <BlogPost
        title={title}
        body={body}
        author={author}
        image={image}
        category={category}
      />
    </>
  )
}

export const getServerSideProps = async ({ query }: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const response = await axios.get(`${apiURL}/api/blog-posts`, {
    params: {
      populate: "featured_image",
      "filters[slug][$eq]": query.slug,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.data) {
    return {
      props: {
        post: response.data.data[0],
      },
    }
  }
}

export default ArtistPage
