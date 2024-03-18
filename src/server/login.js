import axios from 'axios'

const baseUrl = 'http://localhost:4000/api/login'

const login = async (credentials) => {
  try {
    console.log('mohnt')
    const response = await axios.post(baseUrl, credentials, { withCredentials: true })
    console.log(response.data)
    return response.data
  } catch (error) {
    return console.log('Error', error)
  }
}

export default { login }
