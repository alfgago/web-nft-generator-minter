import React, { useState } from "react"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"
import Modal from "@/components/Common/Modal"
import P1Image from "@/components/Common/P1Image"

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
            <P1Image
              alt="Tour Logo"
              src={item.preview_image_url}
              width={120}
              height={120}
            />
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
            <p>{item.pass_type} Pass</p>
          </div>
          <div className="middle">
            {item.pass_type != "Circle" ? (
              <div>
                {item.collection_size}
                <div>total passes</div>
              </div>
            ) : (
              <div>
                {item.winners ? item.winners : item.size} /{" "}
                {item.collection_size}
                <div>giveaway winners per event</div>
              </div>
            )}
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
