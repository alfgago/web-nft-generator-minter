import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"
import axios from "axios"
import { useInterval } from "usehooks-ts"

import cleanUrl, { getPassImageUrl } from "@/utils/cleanUrl"

const SinglePass = dynamic(() => import("@/components/SinglePass"))

const PassPage = ({ pass }: any) => {
  const [loading, setLoading] = useState(false)
  const title = pass.attributes.collection_name
  const imgUrl = getPassImageUrl(pass)
  const image = cleanUrl(imgUrl)
  const ogTitle = title + " - PlusOne"
  const bio = ""

  // Get the router object
  const router = useRouter()

  const checkTransactionStatus = async (transactionId, metadataCid, nftId) => {
    try {
      const { data } = await axios.get(
        "https://withpaper.com/api/v1/transaction-status/" + transactionId
      )
      const claimedTokens = data.result.claimedTokens
      const tokenId = claimedTokens.tokens[0].tokenId
      const collectionAddress = claimedTokens.collectionAddress

      const res = await axios.post(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/nfts/token-uri",
        {
          contractAddress: collectionAddress,
          network: process.env.NEXT_PUBLIC_NETWORK ?? "goerli",
          tokenId,
          metadataCid,
          nftId,
          transactionId,
        }
      )

      return res.data
    } catch (e) {
      console.log(e)
      return false
    }
  }

  useInterval(async () => {
    // @ts-ignore
    if (!window.transactionStatus && !window.sending) {
      // @ts-ignore
      window.sending = true
      const transactionQuery = router.query
      if (!transactionQuery) return

      const { transactionId, metadataCid, nftId } = transactionQuery

      if (!transactionId) return
      console.log("transactionId", transactionId)
      console.log("metadataCid", metadataCid)
      console.log("nftIf", nftId)

      const status = await checkTransactionStatus(
        transactionId,
        metadataCid,
        nftId
      )
      // @ts-ignore
      window.transactionStatus = status
      // @ts-ignore
      window.sending = false
      console.log("status", status)
    }
  }, 2000)

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
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
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

  if (response.data) {
    return {
      props: {
        pass: response.data.data[0],
      },
    }
  }
}

export default PassPage
