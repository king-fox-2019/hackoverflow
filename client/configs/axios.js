import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'http://ec2-3-0-183-33.ap-southeast-1.compute.amazonaws.com',
  headers: {
    access_token: localStorage.getItem('access_token')
  }
})
export default axiosInstance
