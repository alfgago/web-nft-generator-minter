const clean = (src: string) => {
  const cleaned = src
    .replace(
      "https://plusone-public.s3.amazonaws.com",
      process.env.NEXT_PUBLIC_DOMAIN + "/aws"
    )
    .replace("ipfs://", "https://plusonemusic.io/ipfs/")

  return cleaned
}
export default clean
