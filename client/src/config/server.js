import axios from 'axios';

export default axios.create({
  baseURL: 'http://54.169.7.220/',
  // baseURL: 'http://localhost:3000',
  headers: {
    token: localStorage.getItem('token'),
  },
});
