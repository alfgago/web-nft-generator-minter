import Image from "next/image"
import LazyLoad from "react-lazyload"
import { useAccount, useConnect, useSigner } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

import { CommonPill } from "@/components/Common/CommonStyles"
import cleanUrl from "@/utils/cleanUrl"
import { userDynamicMint } from "@/utils/SmartContracts/mint"

import { NftCardStyles } from "./NftCardStyles"

const NftCard = ({ nft, classes = "", pass }: any) => {
  const { data: signer } = useSigner()
  const { isConnected } = useAccount()

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const mint = async () => {
    // If not connected, prompts connection
    if (!isConnected) {
      connect()
      return
    }
    if (!signer) throw new Error("Connect metamask before attempting to mint")

    const txHash = await userDynamicMint({
      network: "goerli",
      metadataCid: nft.attributes.ipfs_token,
      contractAddress: pass.attributes.contract_address,
      signer,
      nftId: nft.id,
    })

    console.log("Mint Transaction Hash: " + txHash)
  }

  return (
    <NftCardStyles className={"drop-card " + classes}>
      <LazyLoad height={200}>
        <div className="image-container">
          <Image
            src={cleanUrl(nft.attributes.image_url)}
            alt={`${nft.attributes.name} NFT Preview Image`}
            quality={90}
            width={400}
            height={400}
          />
        </div>
        <div className="inner">
          <h2 className="title">{nft.attributes.name}</h2>
          <div className="info">
            {!nft.attributes.is_minted ? (
              <>
                <div className="price">
                  <b>Price</b>
                  <span>{pass.attributes.initial_price} ETH</span>
                </div>
                <CommonPill
                  className="clickable blue small"
                  onClick={() => mint()}
                >
                  Buy Now
                </CommonPill>
              </>
            ) : (
              <>
                <div className="price">
                  <b>Price</b>
                  <span>{pass.attributes.initial_price} ETH</span>
                </div>
                <CommonPill
                  className="clickable blue small"
                  onClick={() => mint()}
                >
                  Bid
                </CommonPill>
              </>
            )}
          </div>
        </div>
      </LazyLoad>
    </NftCardStyles>
  )
}

export default NftCard
