import { NextApiRequest, NextApiResponse } from "next"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { ethers } from "ethers"

const createPass = async (values: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.API_TOKEN

  const provider = new ethers.providers.JsonRpcProvider(apiURL)
  const wallet = new ethers.Wallet(token, provider)
  const sdk = new ThirdwebSDK(wallet)

  const contractAddress = values.contract_address
    ? values.contract_address
    : "NO-KEY-YET"
  const contract = await sdk.getContract(contractAddress)

  const pass = await contract.call("createPass", {
    collection_name: values.name,
    collection_size: values.size,
    drop_date: values.dropDate,
    initial_price: values.price,
    royalty_wallet_address: values.wallet,
    artist: values.artist ? values.artist : null,
    tour: values.tour ? values.tour : null,
    event: values.show ? values.show : null,
    pass_type: values.passType,
    sale_type: values.saleType,
    is_lottery: values.passType == "Circle",
    preview_image_url: values.preview_image_url,
    is_charity: values.is_charity,
    charity_name: values.charity_name,
    charity_royalty: values.charity_royalty,
    description: "",
  })

  return pass
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await createPass(req.body)
    res.status(200).json(data)
  } catch (e: any) {
    res.status(400).send({ e: e, err: e.message })
  }
}
