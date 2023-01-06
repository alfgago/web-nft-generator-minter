const clean = (src: string) => {
  return src.replace(
    "https://plusone-public.s3.amazonaws.com",
    process.env.NEXT_PUBLIC_DOMAIN + "/aws"
  )
}
export default clean
