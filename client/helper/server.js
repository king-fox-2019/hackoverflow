import axios from 'axios'

const server = axios.create({
  baseURL: `http://18.136.102.8:81`,
})

export default server