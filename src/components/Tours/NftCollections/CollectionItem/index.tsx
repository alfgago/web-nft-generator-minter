import React from "react"
import { PassThrough } from "stream"

import { CollectionItemStyles } from "./CollectionItemStyles"
const CollectionItem = ({ item }: any) => {
  console.log(item)
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
              <p>{item.pass_type}</p>
            </div>
            <div>
              <button>See on Marketplace</button>
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
            <p>{item.winners}</p>
          </div>
        </div>
      </div>
    </CollectionItemStyles>
  )
}

export default CollectionItem
