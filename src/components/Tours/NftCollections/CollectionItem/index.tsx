import React, { useState } from "react"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"
import Modal from "@/components/Common/Modal"

import EditPerksForm from "../../EditPerksForm"

import { CollectionItemStyles } from "./CollectionItemStyles"
const CollectionItem = ({ item }: any) => {
  const [toggleEdit, setToggleEdit] = useState(false)
  const onEdit = () => {
    setToggleEdit(true)
  }

  return (
    <CollectionItemStyles>
      <div key={item.id} className="itemWrapper">
        <div className="top-content">
          <div className="img-container">
            <img alt="Tour Logo" src={item.preview_image_url} />
          </div>
          <div className="title">
            <h3>{item.collection_name}</h3>
            <CommonPill
              className="clickable black small"
              onClick={() => onEdit()}
            >
              <ReactSVG
                title={"Edit " + item.collection_name}
                className="icon"
                src="/assets/icons/edit.svg"
              />
              Edit Perks
            </CommonPill>
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

        {toggleEdit && (
          <Modal
            setIsOpen={setToggleEdit}
            title={`Edit ${item.collection_name} Perks`}
          >
            <EditPerksForm item={item} />
          </Modal>
        )}
      </div>
    </CollectionItemStyles>
  )
}

export default CollectionItem
