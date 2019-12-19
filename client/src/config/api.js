import axios from 'axios'

const axiosServer = axios.create({
  baseURL: 'http://localhost:80'
})

// const axiosServer = axios.create({
//   baseURL: 'http://18.219.83.129'
// })

export default axiosServer
