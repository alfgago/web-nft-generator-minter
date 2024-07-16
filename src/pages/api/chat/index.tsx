import { NextApiRequest, NextApiResponse } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const fetchData = async ({ user = 0, nft = 0 }: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/";
  const token = process.env.API_TOKEN;

  const sdk = new ThirdwebSDK(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const params: any = {
    populate: "*",
  };

  if (user) {
    params["filters[user][id][$eq]"] = user;
  }

  if (nft) {
    params["filters[id][$eq]"] = nft;
  }

  const response = await sdk.api.get(`/api/nfts`, { params });

  return response.data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data", e });
  }
}
