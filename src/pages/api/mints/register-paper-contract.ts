import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 30 }) // cache for 30 seconds

export async function getContractABI(contractAddress: string) {
  const apikey = "K326TABKXXNYFWV2SF3YZCDRY4GXMH2HPR"
  const response = await fetch(
    `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apikey}`
  )
  const json = await response.json()
  return json.result
}

const fetchData = async ({ contractAddress }: any) => {
  const contractABI = await getContractABI(contractAddress)
  try {
    const response = await fetch(
      "https://withpaper.com/api/2022-08-12/register-contract",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer 96e2b098-4661-4810-8b16-2b633ffa2e81`,
        },
        body: JSON.stringify({
          chain: process.env.NEXT_PUBLIC_PAPER_NETWORK ?? "Goerli",
          contractAddress: contractAddress,
          contractType: "CUSTOM_CONTRACT",
          contractDefinition: contractABI,
        }),
      }
    )

    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.body)
    res.status(200).json(data)
  } catch (e) {
    res
      .status(400)
      .send({ err: "There was an error fetching the data", e: e.message })
  }
}
