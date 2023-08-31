import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { useAccount, useConnect, useSigner } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

import { CommonPill } from "@/components/Common/CommonStyles"
import Modal from "@/components/Common/Modal"
import cleanUrl from "@/utils/cleanUrl"

import { NftCardStyles } from "./NftCardStyles"

const NftCard = ({ nft, classes = "", pass }: any) => {
  const { data: signer } = useSigner()
  const { isConnected, address } = useAccount()
  const [minting, setMinting] = useState(0)
  const [isMinted, setIsMinted] = useState(false)
  const [iframeCheckoutLink, setIframeCheckoutLink] = useState("")

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {
    const queryAlchemy = async () => {
      try {
        const { data } = await axios.post("/api/nfts/is-minted", {
          contractAddress: pass.attributes.contract_address,
          tokenId: nft.attributes.mint_order ?? 0,
        })

        setIsMinted(data)
      } catch (e) {
        // Not minted yet
      }
    }
    queryAlchemy()
  }, [])

  const mint = async (mintingId: number) => {
    checkoutLink()

    setMinting(mintingId)
    // If not connected, prompts connection
    /* if (!isConnected) {
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
    */
  }

  const imageUrl = cleanUrl(nft.attributes.image_url)
  const metadataCid = nft.attributes.ipfs_token

  const checkoutLink = async () => {
    const { data } = await axios.post("/api/mints/paperpay", {
      price: pass.attributes.initial_price,
      title: nft.attributes.name,
      imageUrl: imageUrl,
      metadataCid: metadataCid,
      contractId:
        pass.attributes.paper_contract_id ??
        "0494c9c2-b05e-4d13-9d1b-cee6a878b3ee",
      nftId: nft.id,
      contractAddress: pass.attributes.contract_address,
    })
    if (data) {
      setIframeCheckoutLink(data.checkoutLinkIntentUrl)
    }

    setMinting(0)
  }

  return (
    <NftCardStyles className={"drop-card " + classes}>
      <div className="image-container">
        <img
          src={imageUrl}
          alt={`${nft.attributes.name} NFT Preview Image`}
          width={400}
          height={400}
        />
      </div>
      <div className="inner">
        <h2 className="title">{nft.attributes.name}</h2>
        <div className="info">
          {!isMinted ? (
            <>
              <div className="price">
                <b>Price</b>
                <span>{pass.attributes.initial_price} MATIC</span>
              </div>
              {!minting ? (
                <>
                  <CommonPill
                    className="clickable blue small"
                    onClick={() => mint(nft.id)}
                  >
                    Buy Now
                  </CommonPill>
                </>
              ) : (
                <CommonPill className="clickable loader small">
                  <img
                    width="40px;"
                    height="40px"
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
              <a
                target="_blank"
                href="https://market.plusonemusic.io"
                rel="noreferrer"
              >
                <CommonPill className="clickable blue small">Bid</CommonPill>
              </a>
            </>
          )}
        </div>
      </div>
      {iframeCheckoutLink && (
        <Modal
          setIsOpen={() => setIframeCheckoutLink("")}
          title={`Paper Checkout`}
          className="paper-checkout-modal"
        >
          <iframe src={iframeCheckoutLink} />
        </Modal>
      )}
    </NftCardStyles>
  )
}

export default NftCard
