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
  const [iframeCheckoutLink, setIframeCheckoutLink] = useState("")
  const [addressForPaper, setAddressForPape] = useState("")

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {
    const paperWalletAddress = sessionStorage.getItem("walletAddress")
    if (paperWalletAddress) {
      setAddressForPape(paperWalletAddress)
    } else {
      if (address) {
        setAddressForPape(address)
      }
    }
  }, [address])

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
  const testnetPrice = pass.attributes.initial_price / 50

  const checkoutLink = async () => {
    const { data } = await axios.post("/api/mints/paperpay", {
      price: pass.attributes.initial_price,
      title: nft.attributes.name,
      imageUrl: imageUrl,
      order: nft.attributes.order,
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
        <Image
          src={imageUrl}
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
              <CommonPill className="clickable blue small">Bid</CommonPill>
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
