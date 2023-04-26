import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { useWindowSize } from "usehooks-ts"

import ItemPagination from "@/components/Common/ItemPagination"

import MyNftCard from "../MyNftCard"

import { ShowMyNftStyles } from "./ShowMyNftStyles"

import "swiper/css"

const ShowMyNfts = ({ items }: any) => {
  const { height, width } = useWindowSize()

  return (
    <ShowMyNftStyles className="my-nfts">
      <div className="content">
        {width > 1080 ? (
          <div className="list">
            {items.length > 0 ? (
              <ItemPagination
                itemsPerPage={width > 1080 ? 3 : 2}
                values={items}
                render={(itemsVals: any) => {
                  return (
                    <div className="items-cont">
                      {itemsVals.map((nft: any, index: number) => {
                        return <MyNftCard key={"nft-" + index} nft={nft} />
                      })}
                    </div>
                  )
                }}
              />
            ) : (
              ""
            )}
            <div />
          </div>
        ) : (
          <div className="carousel">
            <Swiper
              spaceBetween={30}
              slidesPerView={1.5}
              direction={"horizontal"}
              navigation
              pagination={{ clickable: true }}
            >
              {items.map((nft: any, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <MyNftCard key={"nft-" + index} nft={nft} />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        )}
      </div>
    </ShowMyNftStyles>
  )
}

export default ShowMyNfts
