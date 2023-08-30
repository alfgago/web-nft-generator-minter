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

  const alchemyToken = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const alchemyDomain =
    process.env.NEXT_PUBLIC_NETWORK == "goerli"
      ? "https://eth-goerli.g.alchemy.com"
      : "https://polygon-mainnet.g.alchemy.com"

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {
    const queryAlchemy = async () => {
      try {
        const response = await axios.get(
          `${alchemyDomain}/nft/v2/${alchemyToken}/getOwnersForToken?contractAddress=${pass.attributes.contract_address}&tokenId=${nft.attributes.order}`
        )

        const minted =
          response?.data?.owners &&
          response?.data?.owners[0] !=
            "0x3d6e3236732adc24557b64a4b35548a1f78c025b"
            ? true
            : false

        setIsMinted(minted)
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

  console.log(nft.attributes.image_url)
  const imageUrl = cleanUrl(nft.attributes.image_url)
  const metadata = nft.attributes.metadata
  console.log(imageUrl)
  const checkoutLink = async () => {
    const { data } = await axios.post("/api/mints/paperpay", {
      price: pass.attributes.initial_price,
      title: nft.attributes.name,
      imageUrl: imageUrl,
      order: nft.attributes.order,
      metadata: metadata,
      contractId:
        pass.attributes.paper_contract_id ??
        "0494c9c2-b05e-4d13-9d1b-cee6a878b3ee",
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
