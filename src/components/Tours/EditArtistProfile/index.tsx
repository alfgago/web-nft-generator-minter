/* eslint-disable guard-for-in */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"
import Modal from "@/components/Common/Modal"

import EditProfileForm from "../EditProfileForm"

import { EditArtistProfileStyles } from "./EditArtistProfileStyles"

const EditArtistProfile = () => {
  const [toggleEdit, setToggleEdit] = useState(false)

  return (
    <EditArtistProfileStyles>
      <CommonPill
        className="edit-profile-button clickable small"
        onClick={() => setToggleEdit(true)}
      >
        <ReactSVG className="edit icon" src="/assets/icons/edit.svg" />
        Edit Artist Profile
      </CommonPill>
      {toggleEdit && (
        <Modal setIsOpen={setToggleEdit} title="Edit Artist Profile">
          <EditProfileForm />
        </Modal>
      )}
    </EditArtistProfileStyles>
  )
}

export default EditArtistProfile
