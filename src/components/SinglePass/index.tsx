import React, { Suspense, useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { InView } from "react-intersection-observer"

import cleanUrl from "@/utils/cleanUrl"
import { getPassDescription } from "@/utils/getPassDescription"

import SimpleHeader from "../Common/SimpleHeader"

import {
  BrowseStyles,
  ListingStyles,
  SinglePassStyles,
} from "./SinglePassStyles"

// Lazy load NftCard component
const NftCard = React.lazy(() => import("./NftCard"))

const SinglePass = ({ pass }: any) => {
  const dropDate = new Date(pass.attributes.drop_date)

  const [nfts, setNfts] = useState([])
  const [mintedNfts, setMintedNfts] = useState([])

  // Fetch the data in the useEffect hook
  useEffect(() => {
    const fetchNftsData = async () => {
      try {
        const { data } = await axios.get(
          `/api/nfts?limit=200&sort=order&pass=${pass.id}`
        )
        const arr = data.data
        setNfts(arr)
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchNftsData()
  }, [])

  // Fetch the data in the useEffect hook
  useEffect(() => {
    const fetchOwnedData = async () => {
      try {
        const { data } = await axios.post(`/api/nfts/owned-per-contract`, {
          contractAddress: pass.attributes.contract_address,
        })
        setMintedNfts(data)
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchOwnedData()
  }, [])

  return (
    <SinglePassStyles>
      <SimpleHeader className="pass-header">
        <div className="flex">
          <Image
            src={cleanUrl(pass.attributes.preview_image_url)}
            alt="PlusOne collection preview image"
            quality={90}
            width={400}
            height={400}
          />
          <div className="inner">
            <h1>{pass.attributes.collection_name}</h1>
            <div className="box">
              <strong>Drop Date:</strong>
              <span>{dropDate.toLocaleString("en-US")}</span>
            </div>
            <div className="box contract">
              <strong>Contract</strong>
              <span>{pass.attributes.contract_address}</span>
            </div>
            {pass.attributes.charity_name && (
              <div className="box">
                <strong>Charity</strong>
                <span>{pass.charity_name}</span>
              </div>
            )}
            <div className="box">
              <strong>Collection Size</strong>
              <span>{pass.attributes.collection_size}</span>
            </div>
            <div className="box">
              <strong>Floor Price</strong>
              <span>{pass.attributes.initial_price} ETH</span>
            </div>
          </div>
        </div>
      </SimpleHeader>
      <BrowseStyles>
        <section className="top-triangle">
          <div className="content">
            <div className="triangle-container">
              <span className="img-span">
                <img src="/assets/img/top-triangle-solo.png" alt="border-top" />
              </span>
            </div>
          </div>
        </section>
        <section className="filter-section">
          <div className="abs">
            <div className="content">
              <div
                className="desc"
                dangerouslySetInnerHTML={{
                  __html: getPassDescription(pass.attributes),
                }}
              />
            </div>
          </div>
        </section>
      </BrowseStyles>
      <ListingStyles>
        <div className="content">
          {mintedNfts && mintedNfts.length > 0 ? (
            <Suspense fallback={<div>Loading...</div>}>
              <div className="list">
                {nfts.map((item: any, index: number) => (
                  <InView key={"nft" + index} triggerOnce>
                    {({ inView, ref }) => (
                      <div ref={ref} className="drop-card">
                        {inView && (
                          <NftCard
                            nft={item}
                            pass={pass}
                            mintedNfts={mintedNfts}
                          />
                        )}
                      </div>
                    )}
                  </InView>
                ))}
              </div>
            </Suspense>
          ) : (
            <div>No NFTs Found</div>
          )}
        </div>
      </ListingStyles>
    </SinglePassStyles>
  )
}

export default SinglePass
