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
    .replace("ipfs://", "https://plusonemusic.io/ipfs/")

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

export default clean
