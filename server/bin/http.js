const http = require('http'),
  app = require('../app'),
  server = http.createServer(app),
  port = process.env.PORT || 80

server.listen(port, () => console.log('listening on : ', port))
