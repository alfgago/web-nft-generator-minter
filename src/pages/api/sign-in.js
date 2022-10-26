import axios from "axios"

const apiURL = process.env.API_URL ?? "http://localhost:1337/"

export const signInRequest = async ({ email, password }) => {
  const response = await axios.post(`${apiURL}/api/auth/local`, {
    identifier: email,
    password: password,
  })

  if (response) {
    return response.data
  }

  return null
}
