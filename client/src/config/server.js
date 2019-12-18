import axios from 'axios';

export default axios.create({
  baseURL: 'http://3.1.201.140/',
  // baseURL: 'http://localhost:3000',
  headers: {
    token: localStorage.getItem('token'),
  },
});
