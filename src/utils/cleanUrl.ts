const clean = (src: string) => {
  src = convertFromNftStorage(src)
  const cleaned = src
    .replace(
      "https://plusone-public.s3.amazonaws.com",
      process.env.NEXT_PUBLIC_DOMAIN + "/aws"
    )
    .replace(
      "https://plusone-public.s3.amazonaws.com",
      process.env.NEXT_PUBLIC_DOMAIN + "/aws"
    )
    .replace("ipfs://", process.env.NEXT_PUBLIC_DOMAIN + "/ipfs/")
    .replace("http://localhost:3000", "https://plusonemusic.io")

  return cleaned
}

function convertFromNftStorage(url: string) {
  if (url.includes("ipfs.nftstorage")) {
    url = url.replace("https://", "")
    const urlParts = url.split(".")
    const ipfsHash = urlParts[0]
    return `https://plusonemusic.io/ipfs/${ipfsHash}`
  }
  return url
}

export const getNftImageUrl = (nft: any) => {
  if (nft && nft.attributes) {
    if (nft.attributes?.art?.data && nft.attributes.art.data.length > 0) {
      return nft.attributes.art.data[0].attributes.url
    }

    return nft.attributes.image_url ?? ""
  }

  return ""
}

export const getPassImageUrl = (pass: any) => {
  const attributes = pass.attributes ? pass.attributes : pass

  if (attributes) {
    if (attributes?.art?.data && attributes.art.data.length > 0) {
      return attributes.art.data[0].attributes.url
    }

    return attributes.preview_image_url ?? ""
  }

  return ""
}

export default clean
