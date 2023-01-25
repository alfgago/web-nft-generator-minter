import React from "react"

import { CommonPill } from "@/components/Common/CommonStyles"

import { CollectionItemStyles } from "./CollectionItemStyles"
const CollectionItem = ({ item }: any) => {
  return (
    <CollectionItemStyles>
      <div key={item.id} className="itemWrapper">
        <div className="container">
          <div className="img-container">
            <img alt="Tour Logo" src={item.preview_image_url} />
          </div>
          <div>
            <div className="content">
              <h3>{item.collection_name}</h3>
            </div>
            <div>
              <CommonPill className="fill clickable small">
                See on marketplace
              </CommonPill>
            </div>
          </div>
        </div>
        <div className="bottom-content">
          <div>
            <p>{item.pass_type}</p>
          </div>
          <div className="middle">
            <p> All</p>
          </div>
          <div>
            <p>
              {item.winners ? item.winners : item.size} / {item.collection_size}
            </p>
          </div>
        </div>
      </div>
    </CollectionItemStyles>
  )
}

export default CollectionItem
