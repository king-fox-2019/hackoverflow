const app = require('../app')
const server = require('http').createServer(app)
const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log('listening to PORT', PORT))
