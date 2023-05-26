import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAccount } from "wagmi"

import { CommonPill } from "@/components/Common/CommonStyles"
import Countdown from "@/components/Common/CountDown"
import P1Image from "@/components/Common/P1Image"
import PassDescription from "@/components/PassDescription"
import cleanUrl from "@/utils/cleanUrl"

import { PerkStyles } from "./PerkStyles"

const OwnedItem = ({ itemData, nftData = false }: any) => {
  const [nft, setNft] = useState<any>(null)

  async function fetchNft() {
    if (nftData) {
      setNft(nftData)
      return
    }
    const nftResponse = await axios.get(
      "/api/nfts/by-image-url?image=" + itemData.image.replace("ipfs://", "")
    )
    console.log("perks:", nftResponse.data)
    setNft(nftResponse.data)
  }
  useEffect(() => {
    fetchNft()
  }, [nftData])

  const image = cleanUrl(itemData.image)
  const passTitle = itemData.name

  return (
    <PerkStyles>
      <div className="image">
        <P1Image src={image} alt={passTitle} />
      </div>

      <div className="title">{passTitle}</div>

      <div className="perks">
        {nft?.attributes?.pass_collection?.data && (
          <PassDescription pass={nft.attributes.pass_collection.data} />
        )}
      </div>
    </PerkStyles>
  )
}

export default OwnedItem
