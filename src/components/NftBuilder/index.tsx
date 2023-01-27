import { useEffect, useState } from "react"
import axios from "axios"
import { NFTStorage } from "nft.storage"
import pLimit from "p-limit"

import SimpleHeader from "../Common/SimpleHeader"

import { useRequestStatus } from "./Hooks/useRequestStatus"
import ConfirmationStep from "./ConfirmationStep"
import DesignStep from "./DesignStep"
import FormStep from "./FormStep"
import { NftBuilderStyles } from "./NftBuilderStyles"
import StepsHeader from "./StepsHeader"

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? ""
const storage = new NFTStorage({ token: NFT_STORAGE_TOKEN })

declare global {
  interface Window {
    canvas: any
    uploadedNfts: any
  }
}

const NftBuilder = ({ artists }: any) => {
  const [nftTitle, setNftTitle] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [images, setImages] = useState([])
  const [memberImage, setMemberImage] = useState("")
  const [activeStep, setActiveStep] = useState(1)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(0)
  const [selectedArtist, setSelectedArtist] = useState(artists[0])
  const [contractAddress, setContractAddress] = useState("")
  const [formValues, setFormValues] = useState({
    name: "AUTOGENERATED",
    wallet: "",
    size: "100",
    passType: "Lottery",
    saleType: "Auction",
    price: "0.1",
    duration: "24",
    winners: "5",
    date: new Date(),
    is_charity: false,
    charity_name: "",
    charity_royalty: "",
  })

  const {
    requestStatus: contractDeployStatus,
    requestData,
    setRequestId,
  } = useRequestStatus()

  useEffect(() => {
    if (contractAddress) {
      console.log("Contract: " + contractAddress)
      createCollection()
    }
  }, [contractAddress])

  useEffect(() => {
    if (requestData?.contractAddress) {
      setContractAddress(requestData.contractAddress)
    }
  }, [requestData])

  useEffect(() => {
    // @ts-ignore
    window.canvas = false
    window.uploadedNfts = 0
    sessionStorage.removeItem("collectionData")
    sessionStorage.removeItem("canvasJson")
    setUploading(false)
  }, [])

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const previousStep = () => {
    setActiveStep(activeStep - 1)
  }

  const onFormSave = (values: any) => {
    nextStep()
    setFormValues(values)
  }

  const submit = async (imges: any) => {
    setImages(imges)
    setUploading(true)
    setUploaded(0)
    // This will request a contract deployment.
    // Once ready, the contractAddress useEffect will create the collection
    await deployContract()
  }

  // This is called when contractAddress is set
  const createCollection = async () => {
    if (uploading) {
      const batchSize = 10
      // Upload first image to use as preview
      const blob = b64toBlob(images[0])
      const nftKey = await storage.storeBlob(blob)
      // Creates the pass, to then associate NFTs to it
      const passResponse = await axios.post("/api/passes/create", {
        ...formValues,
        contract_address: contractAddress,
        preview_image_url: "https://plusonemusic.io/ipfs/" + nftKey,
      })

      // Array used to store the metadata files that will be later uploaded
      const metadatas: any[] = []
      const limit = pLimit(batchSize)
      for (let i = 0; i < images.length; i += batchSize) {
        const batch = images.slice(i, i + batchSize)
        const promises = batch.map((image: any, j: number) => {
          if (image) {
            setUploaded(i + j)
            return limit(() =>
              uploadNft(image, passResponse.data.data.id, i + j, metadatas)
            )
          }
        })
        await Promise.all(promises)
        // NFT Storage limits to 10 requests every 5 seconds, add wait
        await new Promise((resolve) => setTimeout(resolve, 5 * 1000))
      }
      const folderCid = await uploadFolder(metadatas)
      await setFolderStorage(folderCid)
      await bulkMint()
      setUploading(false)
    }
  }

  const uploadFolder = async (metadatas: any) => {
    const { data } = await axios.post("/api/nfts/create-folder", {
      folderName: contractAddress,
      metadatas: JSON.stringify(metadatas),
    })

    return data.cid
  }

  const uploadNft = async (
    image: any,
    passId: any,
    index: any,
    metadatas: any
  ) => {
    const blob = b64toBlob(image)
    const nftKey = await storage.storeBlob(blob)
    const name = formValues.name + " " + (index + 1)
    const imageUrl = "https://plusonemusic.io/ipfs/" + nftKey
    await axios.post("/api/nfts/create", {
      name: name,
      image_url: imageUrl,
      ipfs_token: nftKey,
      pass_id: passId,
    })

    const metadata = {
      name: name,
      image: "ipfs://" + nftKey,
      description: "PlusOne NFT for " + nftTitle,
      external_url: imageUrl,
      attributes: [
        {
          pass_type: formValues.passType,
        },
      ],
    }

    metadatas.push(metadata)
  }

  const setFolderStorage = async (folderCid: string) => {
    const res = await fetch("/api/contracts/setFolderStorage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        network: "goerli",
        folderIPFSUrl: "ipfs://" + folderCid + "/",
      }),
    })

    if (!res.ok)
      throw new Error("Set Folder Storage failed" + (await res.json()))

    const { transactionHash } = await res.json()

    alert("Set Folder Storage Transaction Hash: " + transactionHash)
  }

  const bulkMint = async () => {
    const res = await fetch("/api/contracts/bulkMint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        network: "goerli",
        count: formValues.size,
      }),
    })

    if (!res.ok)
      throw new Error("Admin Bulk Mint failed" + (await res.json()).toString())

    const { transactionHash } = await res.json()

    alert("Admin Bulk Mint Transaction Hash: " + transactionHash)
  }

  const deployContract = async () => {
    const payload = {
      network: "goerli",
      premint: true,
      ...formValues,
    }
    const res = await fetch("/api/contracts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    console.log("testing")

    if (!res.ok) {
      const { err } = await res.json()
      alert("Error: " + err)
    }

    const { requestId } = await res.json()
    setRequestId(requestId)
    return requestId
  }

  return (
    <NftBuilderStyles>
      <SimpleHeader title="NFT Collection Generator" />
      <StepsHeader activeStep={activeStep} />
      <section className="steps">
        <div className="content">
          {activeStep == 1 && (
            <FormStep
              formValues={formValues}
              nextAction={onFormSave}
              artists={artists}
              setNftTitle={setNftTitle}
              nftTitle={nftTitle}
              nftDescription={nftDescription}
              setNftDescription={setNftDescription}
              setMemberImage={setMemberImage}
              setSelectedArtist={setSelectedArtist}
              selectedArtist={selectedArtist}
            />
          )}
          {activeStep == 2 && (
            <DesignStep
              nftName={formValues.name}
              nextAction={nextStep}
              previousAction={previousStep}
              artist={selectedArtist}
              memberImage={memberImage}
            />
          )}
          {activeStep == 3 && (
            <ConfirmationStep
              formValues={formValues}
              nextAction={submit}
              previousAction={previousStep}
              uploading={uploading}
              uploaded={uploaded}
            />
          )}
        </div>
      </section>
      {/* TODO - Show different display states */}
      {contractDeployStatus === "pending" && null}
      {contractDeployStatus === "succeeded" && null}
      {contractDeployStatus === "failed" && null}
    </NftBuilderStyles>
  )
}

export default NftBuilder

function b64toBlob(dataURI: any) {
  const byteString = atob(dataURI.split(",")[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: "image/jpeg" })
}
