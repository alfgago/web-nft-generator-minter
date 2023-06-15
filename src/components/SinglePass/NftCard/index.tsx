import { useState } from "react"
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
  const [minting, setMinting] = useState(0)

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const mint = async (mintingId: number) => {
    setMinting(mintingId)
    // If not connected, prompts connection
    if (!isConnected) {
      connect()
      return
    }
    if (!signer) throw new Error("Connect metamask before attempting to mint")

    const txHash = await userDynamicMint({
      // @ts-ignore
      network: process.env.NEXT_PUBLIC_NETWORK ?? "goerli",
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
                  <span>{pass.attributes.initial_price} MATIC</span>
                </div>
                {!minting ? (
                  <CommonPill
                    className="clickable blue small"
                    onClick={() => mint(nft.id)}
                  >
                    Buy Now
                  </CommonPill>
                ) : (
                  <CommonPill
                    className="clickable loader small"
                    onClick={() => mint(nft.id)}
                  >
                    <img
                      src="/assets/img/spinner.svg"
                      className="spinner"
                      alt="loader"
                    />
                  </CommonPill>
                )}
              </>
            ) : (
              <>
                <div className="price">
                  <b>Price</b>
                  <span>{pass.attributes.initial_price} MATIC</span>
                </div>
                <CommonPill className="clickable blue small">Bid</CommonPill>
              </>
            )}
          </div>
        </div>
      </LazyLoad>
    </NftCardStyles>
  )
}

export default NftCard
