const clean = (src: string) => {
  const cleaned = src
    .replace(
      "https://plusone-public.s3.amazonaws.com",
      process.env.NEXT_PUBLIC_DOMAIN + "/aws"
    )
    .replace(
      "https://plusonemusic.io/ipfs",
      "https://gateway.pinata.cloud/ipfs"
    )
    .replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
  console.log(cleaned)
  return cleaned
}
export default clean
