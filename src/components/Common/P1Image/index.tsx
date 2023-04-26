import Image from "next/image"

import cleanUrl from "@/utils/cleanUrl"

const P1Image = ({
  src,
  alt = "",
  width = 600,
  height = 600,
  customClass,
}: any) => {
  const allowed = [
    "gateway.pinata.cloud",
    "plusone-public.s3.amazonaws.com",
    "plusone-frontend.vercel.app",
    "plusonemusic.io",
    "localhost",
    "ipfs.io",
    "akns-images.eonline.com",
  ]

  const cleanSrc = cleanUrl(src)
  const isReactImage = allowed.some((domain) => cleanSrc.includes(domain))
  console.log(cleanSrc)

  return isReactImage ? (
    <Image src={cleanSrc} alt={alt} width={width} height={height} />
  ) : (
    <img src={cleanSrc} alt={alt} width={width} height={height} />
  )
}

export default P1Image
