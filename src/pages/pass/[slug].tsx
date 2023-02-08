import dynamic from "next/dynamic"
import Head from "next/head"
import axios from "axios"

const SinglePass = dynamic(() => import("@/components/SinglePass"))

const PassPage = ({ pass }: any) => {
  const title = pass.attributes.collection_name
  const image = pass.attributes.preview_image_url
  const ogTitle = title + " - PlusOne"
  const bio = ""

  return (
    <>
      <Head>
        <title>{ogTitle}</title>
        <meta name="description" content={bio} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:image" content={image} />
      </Head>

      <SinglePass pass={pass} />
    </>
  )
}

export const getServerSideProps = async ({ query }: any) => {
  const apiURL = process.env.API_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const response = await axios.get(`${apiURL}/api/passes`, {
    params: {
      populate: "artist.banner,event,tour,collection_preview_image",
      "filters[contract_address][$eq]": query.slug,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response)

  if (response.data) {
    return {
      props: {
        pass: response.data.data[0],
      },
    }
  }
}

export default PassPage