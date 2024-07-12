import React, { useEffect, useState } from "react";
import { useContract, useNFT } from "@thirdweb-dev/react";
import { CommonPill } from "@/components/Common/CommonStyles";
import Countdown from "@/components/Common/CountDown";
import P1Image from "@/components/Common/P1Image";
import PassDescription from "@/components/PassDescription";
import cleanUrl from "@/utils/cleanUrl";
import { PerkStyles } from "./PerkStyles";

const OwnedItem = ({ itemData, nftData = false }: any) => {
  const [nft, setNft] = useState<any>(null);
  const { contract } = useContract(itemData.contractAddress, "nft-collection");

  async function fetchNft() {
    if (nftData) {
      setNft(nftData);
      return;
    }

    try {
      const nftResponse = await contract.get(itemData.tokenId);
      console.log("perks:", nftResponse);
      setNft(nftResponse);
    } catch (error) {
      console.error("Error fetching NFT:", error);
    }
  }

  useEffect(() => {
    fetchNft();
  }, [nftData, contract]);

  const image = cleanUrl(itemData.image);
  const passTitle = itemData.name;

  return (
    <PerkStyles>
      <div className="image">
        <P1Image src={image} alt={passTitle} />
      </div>

      <div className="title">{passTitle}</div>

      <div className="perks">
        {nft?.metadata?.attributes?.pass_collection?.data && (
          <PassDescription pass={nft.metadata.attributes.pass_collection.data} />
        )}
      </div>
    </PerkStyles>
  );
};

export default OwnedItem;
