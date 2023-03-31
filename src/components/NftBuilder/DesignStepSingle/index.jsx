/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { useEffect } from "react"
import React from "react"

import { CommonPill } from "@/components/Common/CommonStyles"
import ImagePicker from "../Tools/ImagePicker"

import { DesignStepStyles } from "./DesignStepStyles"
import PassPreview from "@/components/PassPreview"

const DesignStepSingle = ({
  previousAction,
  nextAction,
  defaultImage = "",
  selectedShow,
  imageUrl,
  setImageUrl,
}) => {
  const doNext = () => {
    nextAction()
  }

  const doPreviousAction = () => {
    previousAction()
  }

  useEffect(() => {
    if (defaultImage) {
      setImageUrl(defaultImage)
    }
  }, [defaultImage])

  return (
    <DesignStepStyles>
      <h2>Collection Template</h2>
      <div className="flex">
        <div className="left-col">
          <div className="settings trap">
            <h4>Change Image</h4>
            <ImagePicker setImageUrl={setImageUrl} />
          </div>
        </div>
        <div className="builder">
          <PassPreview
            previewUrl={imageUrl}
            name={selectedShow.attributes.name}
            city={selectedShow.attributes.city}
            country={selectedShow.attributes.country}
            date={selectedShow.attributes.date}
            customClass="generator"
            template="single"
          />
        </div>
        <div className="tools" />
      </div>

      <div className="buttons">
        <button onClick={() => doPreviousAction()}>
          <CommonPill className="clickable">Previous</CommonPill>
        </button>
        <button onClick={() => doNext()}>
          <CommonPill className="clickable fill">Next</CommonPill>
        </button>
      </div>
    </DesignStepStyles>
  )
}

export default DesignStepSingle
