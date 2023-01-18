import { Network } from "@juicelabs/client"

import { createJuiceClientForAutomation } from "./createJuiceClient"

export type SetFolderStorageParams = {
  network: Network
  contractAddress: string
  folderIPFSUrl: string
}

// sets a "folder" reference for the NFT metadata.
// the storage url points to a folder in ipfs, the contents of the folder
// are N metadata files for how many NFTs you intend to mint. The files must be
// plain test files with the metadata in JSON format. The file names must be
// must be 1, 2, 3, 4, etc... with no .json extension. The folder storage url
// must be stored with a trailing slash as well, e.g. ipfs://folderCID/
// this can be done before the tokens are minted, then each token will
// reference the pre-uploaded metadata once it is minted
export const setMetadataFolderStorage = async ({
  network,
  contractAddress,
  folderIPFSUrl,
}: SetFolderStorageParams) => {
  const jc = await createJuiceClientForAutomation(network, contractAddress)

  if (!jc.baseNFTFacet) throw new Error("Base NFT contract not found")

  const tx = await jc.baseNFTFacet.setFolderStorageBaseURI(folderIPFSUrl)
  await tx.wait()

  return tx.hash
}
