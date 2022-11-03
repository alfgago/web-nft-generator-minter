import React from "react"
import { PassThrough } from "stream"
import { CollectionItemStyles } from "./CollectionItemStyles"
const CollectionItem = ({ currentItems }: any) => {
  return (
    <CollectionItemStyles>
      {currentItems.map((item: any) => {
        return (
          <div key={item.id}>
            <div>
              <span>{item.image}</span>
            </div>
            <div>
              <h2>{item.artisName}</h2>
              <p>{item.passType}</p>
              <p>{item.passType}</p>
              {item.content}
            </div>
          </div>
        )
      })}
    </CollectionItemStyles>
  )
}

export default CollectionItem
