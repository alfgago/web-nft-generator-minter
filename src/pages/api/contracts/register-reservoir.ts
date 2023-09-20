import { NextApiRequest, NextApiResponse } from "next"

const fetchData = async ({ contractAddress }: any) => {
  const options = {
    method: "PUT",
    headers: {
      accept: "*/*",
      "content-type": "application/json",
      "x-api-key": "cef489d6-2ea3-5764-a540-88e4f9d9fb56",
    },
    body: JSON.stringify({ community: "plusonemusic" }),
  }

  fetch(
    "https://api.reservoir.tools/collections/" +
      contractAddress +
      "/community/v1",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchData(req.query)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).send({ err: "There was an error registering the data", e })
  }
}
