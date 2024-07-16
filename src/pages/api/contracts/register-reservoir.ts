import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { ethers } from "ethers"

const fetchData = async ({ contractAddress }: any) => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.ALCHEMY_API_URL
  )
  const sdk = new ThirdwebSDK(provider)

  const contract = await sdk.getContract(contractAddress)
  const communityData = { community: "plusonemusic" }

  try {
    const response = await contract.call("updateCommunity", communityData)
    return response
  } catch (err) {
    console.error(err)
    throw new Error("Error updating community data")
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
    res.status(400).send({ err: "There was an error registering the data", e })
  }
}
