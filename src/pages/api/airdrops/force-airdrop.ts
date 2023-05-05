/* eslint-disable max-len */
import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
import Strapi from "strapi-sdk-js"

import dateFormat from "@/utils/dateFunctions"
import { deployContract, uploadNft } from "@/utils/mintUtils"

const cache = new NodeCache({ stdTTL: 86400 }) // cache for 24 hours

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"
const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
const token = process.env.API_TOKEN

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

const forceAirdrop = async (values: any) => {
  const eventResponse = await axios.get(
    `${apiURL}/api/events/${values.event_id}`,
    {
      params: {
        populate: "image,artist",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const event = eventResponse.data.data

  /*
  const circleResponse = await axios.get(
    `${apiURL}/api/events/${values.circle_nft}`,
    {
      params: {
        populate: "image",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const circleNft = circleResponse.data.data
  */

  const participantsResponse = await axios.get(
    `${apiURL}/api/giveaway-participants`,
    {
      params: {
        "filters[event][id][$eq]": values.event_id,
        populate: "circle_nft",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const participants = participantsResponse.data.data

  // Deploys the contract
  const contractAddress = await createContract(event)
  console.log("contractAddress: ", contractAddress)
  const participantWallets = []
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
    participantWallets.push(participant.attributes.wallet)

    const goldenPassResponse = await axios.post(
      `${apiURL}/api/generate-pass-image`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    participant.passImage = goldenPassResponse.data
  }
  console.log("Participants", participants)

  // Creates the pass, to then associate NFTs to it
  const pass = await createPass(contractAddress, event, participants)
  const passName = event.attributes.name + " Golden Guest Pass"
  console.log("Pass", pass)

  // Loop variable to count the participants
  let loop = 0
  // Array used to store the metadata files that will be later uploaded
  const metadatas: any[] = []
  // Loop participants again once pass is created. Register each new NFT in the contract
  const circleNft = participants[0].attributes.circle_nft.data
  const memberName = circleNft.attributes.metadata.attributes.find(
    (attr: any) => attr.trait_type === "member"
  ).value
  const artistName = event.attributes.artist.data.attributes.name
  const showData = {
    name: passName,
    saleType: "Fixed",
    memberName: memberName,
    passType: "Guest",
    artistName: artistName,
    show: event.id,
  }
  for (const participant of participants) {
    await uploadNft(
      participant.passImage,
      // @ts-ignore
      pass.data.id,
      loop,
      metadatas,
      showData,
      passName
    )
    loop++
  }

  // Bulk airdrops
  axios.post(
    `${baseUrl}/api/airdrops/folder`,
    {
      contractAddress,
      metadatas,
      participantWallets,
      // @ts-ignore
      passId: pass.data.id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return participants
}

const createContract = async (event: any) => {
  const passName = event.attributes.name + " Golden Guest Pass"
  const cacheKey = `airdrop_contract_${event.id}`
  let contractAddress = cache.get(cacheKey)
  if (!contractAddress) {
    const reqId = await deployContract({
      name: passName,
      wallet:
        process.env.ADMIN_WALLET_ADDRESS ??
        "0x8075105DD20Aa65D05DdeD1C8651aB55f76861c7",
      price: 0,
      size: event.attributes.giveaway_slots,
      premint: false,
    })
    contractAddress = await waitForSuccess(reqId)
    if (!contractAddress) {
      throw new Error("Contract creation failed")
    }
    cache.set(cacheKey, contractAddress)
  }
  return contractAddress
}

const createPass = async (
  contractAddress: any,
  event: any,
  participants: any
) => {
  const passName = event.attributes.name + " Golden Guest Pass"
  // Gets Circle NFT from first participant
  const circleNft = participants[0].attributes.circle_nft.data
  // Gets preview image from first participant
  const previewImage = participants[0].passImage
  // Gets artist from event
  const artist = event.attributes.artist.data

  const passParams = {
    collection_name: passName,
    contract_address: contractAddress,
    collection_size: event.attributes.giveaway_slots,
    drop_date: new Date(),
    initial_price: 0,
    royalty_wallet_address: circleNft.attributes.royalty_wallet_address,
    artist: artist.id,
    tour: null,
    event: event.id,
    pass_type: "Guest",
    sale_type: "Fixed",
    is_lottery: false,
    is_airdropped: true, // Unique to golden passes
    preview_image_url: previewImage,
    is_charity: circleNft?.attributes?.is_charity ?? null,
    charity_name: circleNft?.attributes?.charity_name ?? null,
    charity_royalty: circleNft?.attributes?.charity_royalty ?? null,
    description: `Golden Pass Contract`,
  }
  const pass = await strapi.create("passes", passParams)
  return pass
}

async function waitForSuccess(reqId: string) {
  while (true) {
    const juiceResponse = await axios.get(
      "https://juicelabs.io/api/v1/requests/" + reqId
    )
    console.log("Attempt contract creation: ")
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
