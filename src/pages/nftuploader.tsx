import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import FormData from "form-data";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import cleanUrl from "@/utils/cleanUrl";

const NFTUploader = () => {
  const [nfts, setNfts] = useState([]);
  const [passes, setPasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/";
  const token = process.env.NEXT_PUBLIC_API_TOKEN_LIMITED;

  const fetchData = async (endpoint) => {
    let allItems = [];
    let page = 1;
    let fetchMore = true;

    while (fetchMore) {
      try {
        const response = await axios.get(`${apiURL}/api/${endpoint}`, {
          params: {
            "pagination[page]": page,
            "pagination[pageSize]": 100,
            populate: "*",
            sort: "name",
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedItems = response.data.data;
        allItems = allItems.concat(fetchedItems);

        if (fetchedItems.length < 100) {
          fetchMore = false;
        } else {
          page++;
        }
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        fetchMore = false;
      }
    }
    return allItems;
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      const fetchedNFTs = await fetchData("nfts");
      console.log(fetchedNFTs);
      setNfts(fetchedNFTs);
    };

    const fetchPasses = async () => {
      const fetchedPasses = await fetchData("passes");
      setPasses(fetchedPasses);
    };

    fetchNFTs();
    fetchPasses();
  }, []);

  const uploadImagesToArtField = async (nfts) => {
    const sdk = new ThirdwebSDK("mainnet");

    for (const nifty of nfts) {
      try {
        const nft = nifty.attributes;
        const imageUrl = cleanUrl(nft.image_url);
        const art = nft.art.data;

        if (!imageUrl) {
          console.log(`NFT ${nft.name} does not have an image URL.`, nft);
          continue;
        }
        if (art) {
          console.log(`NFT ${nft.name} already has art.`, art);
          continue;
        }
        // Fetch the image from the IPFS URL
        const response = await axios.get(imageUrl, { responseType: "blob" });

        if (!response || response.status !== 200) {
          console.log(`Failed to fetch image for NFT ${nft.name}`);
          continue;
        }

        try {
          const filename = `${nft.name}-${nifty.id}.jpg`;
          const blob = response.data;
          const formData = new FormData();
          formData.append("files", blob, filename);

          // Upload the image to the "art" field for the current NFT
          const uploadResponse = await sdk.storage.upload(formData);

          // Update the NFT's "art" field with the uploaded image
          const updatedArt = uploadResponse.uris[0];
          const editedNft = await axios.put(
            `${apiURL}/api/nfts/${nifty.id}`,
            {
              data: {
                art: updatedArt,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(`Uploaded image for NFT ${nft.name}`);
        } catch (error) {
          console.error(
            `Error uploading image for NFT ${nft.name}: ${error.message}`
          );
        }
      } catch (error) {
        console.log(`Error fetching image for NFT: ${error.message}`);
        continue;
      }
    }
  };

  const uploadPassImagesToArtField = async (passes) => {
    const sdk = new ThirdwebSDK("mainnet");

    for (const nifty of passes) {
      try {
        const nft = nifty.attributes;
        const imageUrl = cleanUrl(nft.preview_image_url);
        const art = nft.art.data;

        if (!imageUrl) {
          console.log(
            `NFT ${nft.collection_name} does not have an image URL.`,
            nft
          );
          continue;
        }
        if (art) {
          console.log(`NFT ${nft.collection_name} already has art.`, art);
          continue;
        }

        // Fetch the image from the IPFS URL
        const response = await axios.get(imageUrl, { responseType: "blob" });

        if (response.status !== 200) {
          console.log(`Failed to fetch image for NFT ${nft.collection_name}`);
          continue;
        }

        try {
          const filename = `${nft.collection_name}-${nifty.id}.jpg`;
          const blob = response.data;
          const formData = new FormData();
          formData.append("files", blob, filename);

          // Upload the image to the "art" field for the current NFT
          const uploadResponse = await sdk.storage.upload(formData);

          // Update the NFT's "art" field with the uploaded image
          const updatedArt = uploadResponse.uris[0];
          const editedNft = await axios.put(
            `${apiURL}/api/passes/${nifty.id}`,
            {
              data: {
                art: updatedArt,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(`Uploaded image for NFT ${nft.collection_name}`);
        } catch (error) {
          console.error(
            `Error uploading image for NFT ${nft.collection_name}: ${error.message}`
          );
        }
      } catch (error) {
        console.log(`Error fetching image for NFT: ${error.message}`);
        continue;
      }
    }
  };

  const handleUploadImages = async () => {
    setIsLoading(true);
    await uploadPassImagesToArtField(passes);
    await uploadImagesToArtField(nfts);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ padding: "9rem" }}>
        <button onClick={() => handleUploadImages()} disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload Images to Art Field"}
        </button>
      </div>
    </>
  );
};

export default NFTUploader;
