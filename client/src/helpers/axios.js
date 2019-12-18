// ==> LocalServer
const axios = require('axios')
module.exports = axios.create({
  baseURL: 'https://localhost:3000'
})

// ==> SERVER DEPLOY
// const axios = require('axios')
// module.exports = axios.create({
// baseURL : '',
// })
