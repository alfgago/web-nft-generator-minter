import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import { useAccount, useConnect, useSigner } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

import { CommonPill } from "@/components/Common/CommonStyles"
import Modal from "@/components/Common/Modal"
import cleanUrl from "@/utils/cleanUrl"

import { NftCardStyles } from "./NftCardStyles"

const NftCard = ({ nft, classes = "", pass }: any) => {
  const { address } = useAccount()
  const [minting, setMinting] = useState(0)
  const [isMinted, setIsMinted] = useState<any>(false)
  const [iframeCheckoutLink, setIframeCheckoutLink] = useState("")
  const router = useRouter()
  const { nftId } = router.query

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

        // @ts-ignore
        if (nftId && parseInt(nftId) === parseInt(nft.id)) {
          setMinting(2)
        }
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

  const mintButton = () => {
    if (isMinted) {
      if (address && isMinted.toLowerCase() == address.toLowerCase()) {
        return <CommonPill className="ownedbtn purple small">Owned</CommonPill>
      }
      return (
        <a
          target="_blank"
          href={
            "https://market.plusonemusic.io/collection/goerli/" +
            pass.attributes.contract_address
          }
          rel="noreferrer"
        >
          <CommonPill className="clickable blue small">Bid</CommonPill>
        </a>
      )
    }

    if (minting) {
      if (minting == 2) {
        return (
          <CommonPill className="ownedbtn purple small">Minting...</CommonPill>
        )
      }
      return (
        <CommonPill className="clickable loader small">
          <img
            width="40px;"
            height="40px"
            src="/assets/img/spinner.svg"
            className="spinner"
            alt="loader"
          />
        </CommonPill>
      )
    }

    return (
      <CommonPill className="clickable blue small" onClick={() => mint(nft.id)}>
        Buy Now
      </CommonPill>
    )
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
          <>
            <div className="price">
              <b>Price</b>
              <span>{pass.attributes.initial_price} MATIC</span>
            </div>
            {mintButton()}
          </>
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
