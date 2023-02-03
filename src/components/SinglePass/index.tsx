import { useEffect, useState } from "react"
import axios from "axios"

import { CommonPill } from "@/components/Common/CommonStyles"

import SimpleHeader from "../Common/SimpleHeader"

import NftCard from "./NftCard"
import {
  BrowseStyles,
  ListingStyles,
  SinglePassStyles,
} from "./SinglePassStyles"

const SinglePass = ({ pass }: any) => {
  const dropDate = new Date(pass.drop_date)

  const [nfts, setNfts] = useState([])
  const [mintedFilter, setMintedFilter] = useState("Unminted")
  const filters = ["All", "Unminted", "Minted"]

  // Fetch the data in the useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/nfts?limit=200&sort=name&pass=${pass.id}&minted=${mintedFilter}`
        )
        const arr = data.data
        setNfts(arr)
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [mintedFilter])

  return (
    <SinglePassStyles>
      <SimpleHeader className="pass-header">
        <div className="flex">
          <img
            src={pass.attributes.preview_image_url}
            alt="PlusOne collection preview image"
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
              <span className="title trap">Filter by: </span>
              <ul className="filters">
                {filters.map((item: any, index: number) => {
                  return (
                    <li key={"filter-" + index}>
                      <CommonPill
                        className={`clickable small ${
                          item == mintedFilter ? "active" : ""
                        }`}
                        onClick={() => setMintedFilter(item)}
                      >
                        {item}
                      </CommonPill>
                    </li>
                  )
                })}
              </ul>
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
