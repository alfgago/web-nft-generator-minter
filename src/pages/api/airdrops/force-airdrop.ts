import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"

import cleanUrl from "@/utils/cleanUrl"
import dateFormat from "@/utils/dateFunctions"
import { deployContract } from "@/utils/mintUtils"
const cache = new NodeCache({ stdTTL: 86400 }) // cache for 24 hours

const forceAirdrop = async (values: any) => {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/"
  const token = process.env.NEXT_PUBLIC_API_TOKEN_LIMITED

  const response = await axios.get(`${apiURL}/api/events/${values.event_id}`, {
    params: {
      populate: "image",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const event = response.data.data
  const params = {
    "filters[event][id][$eq]": values.event_id,
    populate: "circle_nft",
  }

  const participantsResponse = await axios.get(
    `${apiURL}/api/giveaway-participants`,
    {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const participants = participantsResponse.data.data

  const passName = event.name + "Guest Pass"

  const cacheKey = `airdrop_contract_${values.event_id}`
  const cachedContractAddress = cache.get(cacheKey)
  let contractAddress = cachedContractAddress
  if (!cachedContractAddress) {
    const reqId = await deployContract({
      name: passName,
      wallet:
        process.env.ADMIN_WALLET_ADDRESS ??
        "0x8075105DD20Aa65D05DdeD1C8651aB55f76861c7",
      price: 0,
      size: event.giveaway_slots,
      premint: false,
    })
    contractAddress = await waitForSuccess(reqId)
    if (!contractAddress) {
      return "contract creation failed"
    }
    cache.set(cacheKey, contractAddress)
  }

  return contractAddress

  for (const participant of participants) {
    const image = event.attributes.image.data.attributes.url
    const name = event.attributes.name
    const city = event.attributes.city
    const country = event.attributes.country
    const date = dateFormat(event.attributes.date)
    const number = participants.indexOf(participant) + 1
    const nftName = "Guest Pass"
    const data = {
      previewUrl: image,
      template: "golden",
      name: name,
      city: city,
      country: country,
      date: date,
      number: number,
      passTitle: nftName,
    }
    participant.pass = data
    return event

    const goldenPassResponse = await axios.post(
      `${apiURL}/api/generate-pass-image`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    participant.pass = goldenPassResponse.data
  }

  return participants
}

async function waitForSuccess(reqId: string) {
  while (true) {
    const juiceResponse = await axios.get(
      "https://juicelabs.io/api/v1/requests/" + reqId
    )
    console.log(juiceResponse.data)
    if (juiceResponse.data.status === "succeeded") {
      return juiceResponse.data.contractAddress
    }
    if (juiceResponse.data.status === "failed") {
      return false
    }

    // Wait for 5 seconds before making the next query
    await new Promise((resolve) => setTimeout(resolve, 5000))
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await forceAirdrop(req.query)
    res.status(200).json(data)
  } catch (e: any) {
    console.log(e)
    res.status(400).send({ e: e, err: e.message })
  }
}
