import axios from 'axios'

const config = axios.create({
  baseURL: 'http://localhost:3333'
})

export default config
