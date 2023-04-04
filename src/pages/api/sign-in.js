import axios from "axios"

const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://plusone.stag.host"

export const signInRequest = async ({ email, password }) => {
  console.log(`${apiURL}/api/auth/local`)
  const response = await axios.post(`${apiURL}/api/auth/local`, {
    identifier: email,
    password: password,
  })

  if (response) {
    return response.data
  }

  return null
}
