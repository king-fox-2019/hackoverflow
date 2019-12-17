import axios from 'axios';

export default axios.create({
  // baseURL: 'http://13.229.207.247',
  baseURL: 'http://localhost:3000',
  headers: {
    token: localStorage.getItem('token'),
  },
});
