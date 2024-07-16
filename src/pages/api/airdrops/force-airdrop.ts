/* eslint-disable max-len */
import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import NodeCache from "node-cache"
import Strapi from "strapi-sdk-js"

import dateFormat from "@/utils/dateFunctions"
import {
  deployContract,
  publishPaperContract,
  uploadNft,
} from "@/utils/mintUtils"

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
  // @ts-ignore
  publishPaperContract(contractAddress, pass.data.id)
  console.log("contractAddress: ", contractAddress)

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
    saleType: "Auction",
    memberName: memberName,
    passType: "Guest",
    artistName: artistName,
    show: event.id,
    is_airdropped: true,
  }
  for (const participant of participants) {
    const newNft = await uploadNft(
      participant.passImage,
      // @ts-ignore
      pass.data.id,
      loop,
      metadatas,
      showData,
      passName,
      participant?.attributes?.wallet ?? ""
    )
    // @ts-ignore
    createAirdrop(participant?.id, newNft.id)
    loop++
  }

  // Bulk airdrops
  axios.post(
    `${baseUrl}/api/airdrops/trigger-bulk`,
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

/**
 * Creates a contract for a Golden Guest Pass.
 * @param event - The event for which the contract is created.
 * @returns The address of the newly created contract.
 * @throws Throws an error if contract creation fails.
 */
const createContract = async (
  event: {
    id: string;
    attributes: {
      name: string;
      giveaway_slots: number;
    };
  }
): Promise<string> => {
  const passName = `${event.attributes.name} Golden Guest Pass`;
  const cacheKey = `airdrop_contract_${event.id}`;
  let contractAddress: string | undefined = cache.get(cacheKey);
  if (!contractAddress) {
    const { network, name, price, size, premint } = await transformCreateContractParams({
      network: "polygon" as Network,
      name: passName,
      wallet:
        process.env.ADMIN_WALLET_ADDRESS ??
        "0x8075105DD20Aa65D05DdeD1C8651aB55f76861c7",
      price: 0,
      size: event.attributes.giveaway_slots,
      premint: false,
    });
    const jc = await createJuiceClientForAutomation(network);
    const reqId = await jc.utils.contracts.create({
      contract: {
        asciiArt: ``,
        contractName: toPascalCase("P1" + name),
      },
      metadata: {
        name,
        symbol: "P1",
        maxSupply: size,
        royaltyBips: 0, // TODO - @zac actually perform transformation
      },
      paymentSplits: [],
      lazyMintSettings: {
        premint,
      },
    });
    contractAddress = await waitForSuccess(reqId);
    if (!contractAddress) {
      throw new Error("Contract creation failed");
    }
    cache.set(cacheKey, contractAddress);
  }
  return contractAddress;
};

/**
 * Creates a pass for a golden guest event.
 *
 * @param {any} contractAddress - The address of the contract.
 * @param {any} event - The event object.
 * @param {any} participants - The array of participants.
 * @return {Promise<any>} The created pass.
 */
const createPass = async (
  contractAddress: any,
  event: any,
  participants: any
) => {
  // Construct the pass name by appending "Golden Guest Pass" to the event's name
  const passName = event.attributes.name + " Golden Guest Pass";

  // Get the Circle NFT from the first participant
  // We need the NFT for the royalty wallet address and other properties
  const circleNft = participants[0].attributes.circle_nft.data;

  // Get the preview image from the first participant
  // This will be used as the preview image for the pass
  const previewImage = participants[0].passImage;

  // Get the artist from the event
  // We need the artist ID for the pass
  const artist = event.attributes.artist.data;

  // Construct the pass parameters object
  const passParams = {
    // The name of the pass
    collection_name: passName,
    // The address of the contract
    contract_address: contractAddress,
    // The size of the collection
    collection_size: event.attributes.giveaway_slots,
    // The date and time the pass will be dropped
    drop_date: new Date(),
    // The initial price of the pass
    initial_price: 0,
    // The address of the royalty wallet
    royalty_wallet_address: circleNft.attributes.royalty_wallet_address,
    // The ID of the artist
    artist: artist.id,
    // The ID of the event
    event: event.id,
    // The type of pass
    pass_type: "Guest",
    // The sale type of the pass
    sale_type: "Fixed",
    // Whether it is a lottery (false for golden passes)
    is_lottery: false,
    // Whether it is airdropped (unique to golden passes)
    is_airdropped: true,
    // The URL of the preview image
    preview_image_url: previewImage,
    // Whether it is a charity (null if not specified)
    is_charity: circleNft.attributes?.is_charity ?? null,
    // The name of the charity (null if not specified)
    charity_name: circleNft.attributes?.charity_name ?? null,
    // The royalty of the charity (null if not specified)
    charity_royalty: circleNft.attributes?.charity_royalty ?? null,
    // The description of the pass
    description: `Golden Pass Contract`,
  };

  // Create the pass using Strapi
  // Strapi will handle the creation of the pass
  const pass = await strapi.create("passes", passParams);

  return pass;

const createAirdrop = async (participantId: string, nftId: number) => {
  const airdrop = await strapi.create("airdrops", {
    winner: participantId,
    airdropped_nft: nftId,
  })
  return airdrop
}

async function waitForSuccess(reqId: string) {
  console.log("Waiting for juice request to succeed...")
  while (true) {
    console.log(`Querying juice request status for ${reqId}`)
    const juiceResponse = await axios.get(
      "https://juicelabs.io/api/v1/requests/" + reqId
    )
    console.log(juiceResponse.data)
    if (juiceResponse.data.status === "succeeded") {
      console.log("Juice request succeeded")
      return juiceResponse.data.contractAddress
    }
    if (juiceResponse.data.status === "failed") {
      console.log("Juice request failed")
      return false
    }

    // Wait for 5 seconds before making the next query
    console.log("Juice request not yet succeeded, waiting for 5 seconds...")
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
