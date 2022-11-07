import { useState } from "react"

/* eslint-disable @typescript-eslint/no-unused-vars */
const ImagePicker = ({ setImageUrl }: any) => {
  const [image, setImage] = useState(null)
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      console.log(i)
      setImage(i)
      setImageUrl(URL.createObjectURL(i))
    }
  }

  /*
  const uploadToServer = async (event) => {
    const body = new FormData()
    body.append("file", image)
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    })
  }
  */

  return <input type="file" name="nftImage" onChange={uploadToClient} />
}

export default ImagePicker
