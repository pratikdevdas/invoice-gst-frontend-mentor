import axios from 'axios'

const baseUrl = 'http://localhost:4000/api/orderSlips'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

export default { getAll, createNew }
