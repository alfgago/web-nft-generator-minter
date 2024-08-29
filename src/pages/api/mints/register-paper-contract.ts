import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { ethers } from "ethers"

const sdk = new ThirdwebSDK("goerli")

const fetchData = async ({ contractAddress, passId }: any) => {
  try {
    const network = process.env.NEXT_PUBLIC_NETWORK ?? "goerli"
    const contract = await sdk.getContract(contractAddress)

    const contractABI = await contract.getAbi()

    const response = await fetch(
      "https://withpaper.com/api/2022-08-12/register-contract",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.PAPER_BEARER_TOKEN}`,
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

    if (passId) {
      await updatePass(passId, data.contractId)
    }

    return data
  } catch (err) {
    console.log(err)
  }
}

const updatePass = async (passId: number, paperData: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const response = await fetch(`${apiURL}/api/passes/${passId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        paper_contract_id: paperData,
      },
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to update pass")
  }

  return await response.json()
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.body)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
