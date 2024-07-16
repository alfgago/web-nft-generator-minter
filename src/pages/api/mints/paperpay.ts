import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { ethers } from "ethers"

const fetchData = async ({
  price,
  title,
  imageUrl,
  order = 0,
  metadataCid,
  contractId = "0494c9c2-b05e-4d13-9d1b-cee6a878b3ee",
  nftId,
  contractAddress,
}: any) => {
  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.PRIVATE_KEY,
      ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
    )
  )
  const contract = await sdk.getContract(contractAddress, "nft-drop")

  try {
    const tx = await contract.claimTo(process.env.WALLET_ADDRESS, order, {
      quantity: 1,
      pricePerToken: ethers.utils.parseEther(price.toString()),
      currencyAddress: ethers.constants.AddressZero,
    })

    const callbackUrl = `${process.env.DOMAIN}/pass/${contractAddress}?metadataCid=${metadataCid}&nftId=${nftId}`
    return { tx, callbackUrl }
  } catch (err) {
    return { error: err.message }
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
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
