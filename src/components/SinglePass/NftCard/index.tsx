// @ts-nocheck
import LazyLoad from "react-lazyload"
import { useSigner } from "wagmi"

import { CommonPill } from "@/components/Common/CommonStyles"
import s3url from "@/utils/s3url"
import { userDynamicMint } from "@/utils/SmartContracts/mint"

import { NftCardStyles } from "./NftCardStyles"

const NftCard = ({ nft, classes = "", pass }: any) => {
  const { data: signer } = useSigner()
  console.log({
    network: "goerli",
    metadataCid: nft.attributes.ipfs_token,
    contractAddress: pass.attributes.contract_address,
    signer,
  })
  const mint = async () => {
    const add = await signer?.getAddress()
    alert(add)
    if (!signer) throw new Error("Connect metamask before attempting to mint")

    const txHash = await userDynamicMint({
      network: "goerli",
      metadataCid: nft.attributes.ipfs_token,
      contractAddress: pass.attributes.contract_address,
      signer,
    })

    alert("Mint Transaction Hash: " + txHash)
  }

  return (
    <NftCardStyles className={"drop-card " + classes}>
      <LazyLoad height={200}>
        <div className="image-container">
          <img
            src={s3url(nft.attributes.image_url)}
            alt="Collection Preview Image"
          />
        </div>
        <div className="inner">
          <h2 className="title">{nft.attributes.name}</h2>
          <div className="info">
            <div className="price">
              <b>Price</b>
              <span>{pass.attributes.initial_price} ETH</span>
            </div>
            <CommonPill className="clickable blue small" onClick={() => mint()}>
              Buy Now
            </CommonPill>
          </div>
        </div>
      </LazyLoad>
    </NftCardStyles>
  )
}

export default NftCard
