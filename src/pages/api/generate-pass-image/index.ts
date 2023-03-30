import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import puppeteer from "puppeteer"

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? ""

const postData = async ({
  previewUrl,
  template = "single",
  name,
  city,
  country,
  date,
  number = 1,
  passTitle,
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
  }
  .pass-preview.generator .inner .main-image .text {
    font-size: 20px;
  }
  .pass-preview.generator .inner .right .text {
    font-size: 30px;
    padding-right: 30px;
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
  .pass-preview .inner .main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    border-radius: 30px;
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
  }
  
  `

  const html = `
  <div class="pass-preview generator">
    <div class="inner">
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
          src="${process.env.NEXT_PUBLIC_DOMAIN}/assets/img/p1-small-vertical.jpg"
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
    return res.status(405).send({ error: "Method not allowed" })
  }

  try {
    const data = await postData(req.body)
    res.status(200).json(data)
  } catch (e) {
    console.log(e)
    res.status(400).send({ err: "There was an error fetching the data" })
  }
}
