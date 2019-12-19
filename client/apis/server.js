import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://54.179.190.77'
})

export default instance
