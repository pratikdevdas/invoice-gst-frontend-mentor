import axios from 'axios'

const baseUrl = 'http://localhost:4000/api/orderSlips'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content, token) => {
  const response = await axios.post(baseUrl, content, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const updateOrder = async (id, content, token) => {
  const response = await axios.put(`${baseUrl}/${id}`, content, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export default { getAll, createNew, updateOrder }
