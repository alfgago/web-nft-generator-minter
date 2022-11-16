import React from "react"
import { PassThrough } from "stream"

import { CollectionItemStyles } from "./CollectionItemStyles"
const CollectionItem = ({ item }: any) => {
  return (
    <CollectionItemStyles>
      <div key={item.id} className="itemWrapper">
        <div className="container">
          <div className="img-container">
            <img alt="Tour Logo" src={item.image} />
          </div>
          <div>
            <div className="content">
              <h3>{item.artistName}</h3>
              <p>{item.passType}</p>
              <p>{item.extraInfo}</p>
            </div>
            <div>
              <button>See on Marketplace</button>
            </div>
          </div>
        </div>
        <div className="bottom-content">
          <div>
            <p>{item.passType}</p>
          </div>
          <div className="middle">
            <p> Tour / {item.eventName}</p>
          </div>
          <div>
            <p>{item.amount}</p>
          </div>
        </div>
      </div>
    </CollectionItemStyles>
  )
}

export default CollectionItem
