import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"

import { CommonPill } from "@/components/Common/CommonStyles"
import cleanUrl from "@/utils/cleanUrl"
import { getPassDescription } from "@/utils/getPassDescription"

import SimpleHeader from "../Common/SimpleHeader"

import NftCard from "./NftCard"
import {
  BrowseStyles,
  ListingStyles,
  SinglePassStyles,
} from "./SinglePassStyles"

const SinglePass = ({ pass }: any) => {
  const dropDate = new Date(pass.attributes.drop_date)

  const [nfts, setNfts] = useState([])

  // Fetch the data in the useEffect hook
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData()
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
          <div className="list">
            {nfts.map((item: any, index: number) => {
              return <NftCard key={"nft" + index} nft={item} pass={pass} />
            })}
          </div>
        </div>
      </ListingStyles>
    </SinglePassStyles>
  )
}

export default SinglePass
