import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useInterval } from "usehooks-ts";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

import cleanUrl, { getPassImageUrl } from "@/utils/cleanUrl";

const SinglePass = dynamic(() => import("@/components/SinglePass"));

const sdk = new ThirdwebSDK("goerli"); // Use the appropriate network

const PassPage = ({ pass }) => {
  const [loading, setLoading] = useState(false);
  const title = pass.attributes.collection_name;
  const imgUrl = getPassImageUrl(pass);
  const image = cleanUrl(imgUrl);
  const ogTitle = title + " - PlusOne";
  const bio = "";

  // Get the router object
  const router = useRouter();

  const checkTransactionStatus = async (transactionId, metadataCid, nftId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
      const txReceipt = await provider.getTransactionReceipt(transactionId);

      if (txReceipt && txReceipt.status === 1) { // Transaction succeeded
        const logs = txReceipt.logs;
        const claimedTokens = logs.map((log) => {
          // Decode the log to get the tokenId and collectionAddress
          const parsedLog = sdk.nft.parseTokenTransferEvent(log);
          return {
            tokenId: parsedLog.tokenId.toString(),
            collectionAddress: parsedLog.contractAddress,
          };
        });

        const res = await axios.post(
          process.env.NEXT_PUBLIC_DOMAIN + "/api/nfts/token-uri",
          {
            contractAddress: claimedTokens[0].collectionAddress,
            network: process.env.NEXT_PUBLIC_NETWORK ?? "goerli",
            tokenId: claimedTokens[0].tokenId,
            metadataCid,
            nftId,
            transactionId,
          }
        );

        return res.data;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  useInterval(async () => {
    if (!window.transactionStatus && !window.sending) {
      window.sending = true;
      const transactionQuery = router.query;
      if (!transactionQuery) return;

      const { transactionId, metadataCid, nftId } = transactionQuery;

      if (!transactionId) return;
      console.log("transactionId", transactionId);
      console.log("metadataCid", metadataCid);
      console.log("nftIf", nftId);

      const status = await checkTransactionStatus(transactionId, metadataCid, nftId);
      window.transactionStatus = status;
      window.sending = false;
      console.log("status", status);
    }
  }, 2000);

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
  );
};

export const getServerSideProps = async ({ query }) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/";
  const token = process.env.API_TOKEN;

  const response = await axios.get(`${apiURL}/api/passes`, {
    params: {
      populate: "artist.banner,event,tour,collection_preview_image",
      "filters[contract_address][$eq]": query.slug,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    return {
      props: {
        pass: response.data.data[0],
      },
    };
  }
};

export default PassPage;
