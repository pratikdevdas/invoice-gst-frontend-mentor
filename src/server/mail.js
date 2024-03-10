import axios from 'axios'

const sendMail = (data) => axios.post('http://localhost:3001/sendMail', data)
export default { sendMail }
