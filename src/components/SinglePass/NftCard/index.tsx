import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";

import { CommonPill } from "@/components/Common/CommonStyles";
import Modal from "@/components/Common/Modal";
import cleanUrl, { getNftImageUrl } from "@/utils/cleanUrl";

import { NftCardStyles } from "./NftCardStyles";

const NftCard = ({ nft, classes = "", pass, mintedNfts = [] }: any) => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const [minting, setMinting] = useState(0);
  const [isMinted, setIsMinted] = useState<any>(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [iframeCheckoutLink, setIframeCheckoutLink] = useState("");
  const router = useRouter();
  const { nftId } = router.query;
  const orderId = nft.attributes.mint_order ?? 0;

  const { contract } = useContract(pass.attributes.contract_address, "nft-collection");

  useEffect(() => {
    const queryIfMinted = async () => {
      try {
        // Convert tokenId to the format it appears in mintedNfts
        const formattedTokenId = `0x${parseInt(orderId)
          .toString(16)
          .padStart(64, "0")}`;

        // Find the owner of the tokenId in the mintedNfts
        const tokenOwnerEntry = mintedNfts.find((owner) =>
          owner.tokenBalances.some(
            (token) => token.tokenId === formattedTokenId
          )
        );

        if (tokenOwnerEntry) {
          setIsMinted(true);
          setOwnerAddress(tokenOwnerEntry.ownerAddress);
        } else {
          setIsMinted(false);
        }

        if (nftId && parseInt(nftId) === parseInt(nft.id)) {
          setMinting(2);
        }
      } catch (e) {
        console.error("An error occurred while querying if minted", e);
      }
    };

    queryIfMinted();
  }, [mintedNfts, nftId, orderId, nft.id]);

  const mint = async (mintingId: number) => {
    try {
      setMinting(mintingId);
      const tx = await contract.mintTo(address, {
        metadata: {
          name: nft.attributes.name,
          image: getNftImageUrl(nft),
          ipfsToken: nft.attributes.ipfs_token,
        },
        price: pass.attributes.initial_price,
      });
      console.log("Mint Transaction:", tx);
      setMinting(0);
      // Optionally, you can refresh the minted NFTs list here to update the UI
    } catch (error) {
      console.error("Minting failed:", error);
      setMinting(0);
    }
  };

  const geturl = getNftImageUrl(nft);
  const imageUrl = cleanUrl(geturl);

  const mintButton = () => {
    if (isMinted) {
      if (address && ownerAddress.toLowerCase() === address.toLowerCase()) {
        return <CommonPill className="ownedbtn purple small">Owned</CommonPill>;
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
      );
    }

    if (minting) {
      if (minting === 2) {
        return (
          <CommonPill className="ownedbtn purple small">Minting...</CommonPill>
        );
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
      );
    }

    return (
      <CommonPill className="clickable blue small" onClick={() => mint(nft.id)}>
        Buy Now
      </CommonPill>
    );
  };

  return (
    <NftCardStyles className={classes}>
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
          title={`Checkout`}
          className="paper-checkout-modal"
        >
          <iframe src={iframeCheckoutLink} />
        </Modal>
      )}
    </NftCardStyles>
  );
};

export default NftCard;
