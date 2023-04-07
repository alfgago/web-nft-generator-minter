import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import puppeteer from "puppeteer"

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? ""

const postData = async ({
  previewUrl = "https://plusone-public.s3.amazonaws.com/Steve_Aoki_purple_800x400_1_107ada7677.png",
  template = "single",
  name = "Test",
  city = "California",
  country = "USA",
  date = "May 23 2023",
  number = 1,
  passTitle = "Guest Pass",
}: any) => {
  const width = 640
  const height = 640

  // Compile the Sass code into CSS
  const cssCode = `

  @font-face {
    font-family: "Trap";
    src: url("https://plusonemusic.io/assets/fonts/Trap-Regular.woff2") format("woff2"),
      url("https://plusonemusic.io/assets/fonts/Trap-Regular.woff") format("woff"),
      url("https://plusonemusic.io/assets/fonts/Trap-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'Trap', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  .pass-preview {
    position: relative;
    margin-top: 16px;
    padding: 16px 40px;
    background: #eee;
  }
  .pass-preview.generator {
    width: 640px;
    height: 640px;
    padding: 20px;
    background: transparent;
    margin: 0;
  }
  .pass-preview.generator .inner {
    width: 600px;
    height: 600px;
    margin: 0;
  }
  .pass-preview.generator .inner .main-image .text {
    font-size: 20px;
  }
  .pass-preview.generator .inner .right .text {
    font-size: 30px;
    padding-right: 0;
    padding-left: 32px;
  }
  .pass-preview.previews {
    padding: 0;
    margin: 0;
  }
  .pass-preview.golden .inner .right .text {
    position: absolute;
    top: 50%;
  }
  .pass-preview.golden .bg {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 30px;
    border-top-left-radius: 30px;
    overflow: hidden;
  }
  .pass-preview.golden .bg:before {
    background-image: url("https://plusonemusic.io/assets/img/gold-bg.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center right;
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .pass-preview.golden .bg:after {
    content: "";
    background: #fff;
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50%;
  }
  .pass-preview .inner {
    background: #fff;
    position: relative;
    width: 300px;
    height: 300px;
    margin: auto;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  .pass-preview .inner .main-image {
    position: relative;
    height: 100%;
    width: 75%;
  }
  .pass-preview .inner .main-image:before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    content: "";
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%);
    z-index: 1;
    border-radius: 15px;
  }
  .pass-preview .inner .main-image:after {
    content: "";
    position: absolute;
    top: 14px;
    left: 50%;
    width: 100px;
    background: #fff;
    height: 14px;
    margin-left: -50px;
    border-radius: 50px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  }
  .pass-preview .inner .main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }
  .pass-preview .inner .main-image .text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 16px;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: #fff;
    z-index: 1;
  }
  .pass-preview .inner .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 25%;
    height: 100%;
  }
  .pass-preview .inner .right .p1-vert {
    display: block;
    position: relative;
    padding-top: 16px;
    margin: auto;
    max-width: 60%;
    height: auto;
  }
  .pass-preview .inner .right .text {
    padding: 16px;
    font-size: 16px;
    font-weight: bold;
    text-align: right;
  }
  .pass-preview .inner .right .qr {
    position: absolute;
    bottom: 16px;
    right: 20%;
    max-width: 60%;
    height: auto;
  }
  .pass-preview img {
    pointer-events: none;
  }
  
  
  `

  const html = `
  <div class="pass-preview generator ${template}">
    <div class="inner">
      <div class="bg"></div>
      <div class="main-image">
        <img id="prev" src=${previewUrl} alt="Image preview" />
        <div class="text">
          <div class="venue">${name}</div>
          <div class="address">
            ${city}, ${country}
          </div>
          <div class="date">${date}</div>
        </div>
      </div>
      <div class="right">
        <img
          class="p1-vert"
          src="${process.env.NEXT_PUBLIC_DOMAIN}/assets/img/${
    template == "golden" ? "p1-vert-white.svg" : "p1-small-vertical.jpg"
  }"
          alt="p1-small-vertical"
        />
        <div class="text">
          <div>Guest</div>
          <div>Pass</div>
          <div>#${number}</div>
        </div>
        <img
          class="qr"
          src="${process.env.NEXT_PUBLIC_DOMAIN}/assets/img/sample-qr.png"
          alt="sample QR PlusOne"
        />
      </div>
    </div>
  </div>
  `

  // Launch a headless browser
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Set the viewport size to the desired width and height
  await page.setViewport({ width, height })

  // Set the HTML content and CSS styles
  await page.setContent(`
    <style>${cssCode}</style>
    ${html}
  `)

  // Wait for all images to load
  await page.waitForFunction(() => {
    const images = Array.from(document.images)
    return images.every((img) => img.complete && img.naturalHeight !== 0)
  })
  await page.waitForSelector("img", { visible: true })

  // Get the canvas element and convert it to a data URL
  const div = await page.$(".pass-preview")
  // @ts-ignore
  const screenshotBuffer = await div.screenshot({
    encoding: "binary",
    omitBackground: true,
  })
  // Close the browser
  await browser.close()

  const passName = passTitle + " " + number
  const desc = "PlusOne NFT for " + passTitle

  const metadata = JSON.stringify({
    name: passName,
    description: desc,
  })

  const response = await axios.post(
    "https://api.nft.storage/upload",
    screenshotBuffer,
    {
      headers: {
        "Content-Type": "image/png",
        Authorization: `Bearer ${NFT_STORAGE_TOKEN}`,
        "X-Client-Metadata": metadata,
      },
    }
  )

  return "ipfs://" + response.data.value.cid
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    // return res.status(405).send({ error: "Method not allowed" })
  }

  try {
    const data = await postData(req.query)
    res.status(200).json(data)
  } catch (e) {
    console.log(e)
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
