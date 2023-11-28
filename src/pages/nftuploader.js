import { useEffect, useState } from "react"
import axios from "axios"
import FormData from "form-data"
import Strapi from "strapi-sdk-js"

import cleanUrl from "@/utils/cleanUrl"

const NFTUploader = () => {
  const [nfts, setNfts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/"
  const token = process.env.NEXT_PUBLIC_API_TOKEN_LIMITED

  useEffect(() => {
    const fetchNFTs = async () => {
      let allNFTs = []
      let page = 1
      let fetchMore = true

      while (fetchMore) {
        try {
          const response = await axios.get(`${apiURL}/api/nfts`, {
            params: {
              "pagination[page]": page,
              "pagination[pageSize]": 100,
              populate: "*",
              sort: "name",
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const fetchedNFTs = response.data.data
          allNFTs = allNFTs.concat(fetchedNFTs)

          // If the number of items fetched is less than 100, it's the last page
          if (fetchedNFTs.length < 100) {
            fetchMore = false
          } else {
            page++
          }
        } catch (error) {
          console.error("Error fetching NFTs:", error.message)
          fetchMore = false // Stop the loop in case of an error
        }
      }

      console.log(allNFTs)
      setNfts(allNFTs) // Uncomment to set the state with all fetched NFTs
    }

    fetchNFTs()
  }, [])

  const uploadImagesToArtField = async (nfts) => {
    for (const nifty of nfts) {
      console.log(nifty)
      const nft = nifty.attributes
      const imageUrl = cleanUrl(nft.image_url)
      const art = nft.art.data

      if (!imageUrl) {
        console.log(`NFT ${nft.name} does not have an image URL.`, nft)
        continue
      }
      if (art) {
        console.log(`NFT ${nft.name} already has art.`, art)
        continue
      }

      // Fetch the image from the IPFS URL
      const response = await axios.get(imageUrl, { responseType: "blob" })

      if (response.status !== 200) {
        console.log(`Failed to fetch image for NFT ${nft.name}`)
        continue
      }

      try {
        const filename = `${nft.name}-${nifty.id}.jpg`
        const blob = response.data
        const formData = new FormData()
        formData.append("files", blob, filename)

        const strapi = new Strapi({
          url: apiURL,
          prefix: "/api",
          store: {
            key: "strapi_jwt",
            useLocalStorage: false,
            cookieOptions: { path: "/" },
          },
          axiosOptions: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        })

        // Upload the image to the "art" field for the current NFT
        const uploadResponse = await strapi.axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        // Update the NFT's "art" field with the uploaded image
        const editedNft = await strapi.update("nfts", nifty.id, {
          art: [uploadResponse.data[0].id],
        })

        console.log(`Uploaded image for NFT ${nft.name}`)
      } catch (error) {
        console.error(
          `Error uploading image for NFT ${nft.name}: ${error.message}`
        )
      }
    }
  }

  const handleUploadImages = async () => {
    setIsLoading(true)
    await uploadImagesToArtField(nfts)
    setIsLoading(false)
  }

  return (
    <div style={{ padding: "9rem" }}>
      <button onClick={() => handleUploadImages()} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload Images to Art Field"}
      </button>
    </div>
  )
}

export default NFTUploader
