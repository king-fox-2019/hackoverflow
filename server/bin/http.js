const http = require('http'),
  app = require('../app'),
  server = http.createServer(app),
  port = process.env.PORT || 80,
  io = require('socket.io')(server),
  CronJob = require('cron').CronJob

server.listen(port, () => console.log('listening on : ', port))

io.on('connection', function (socket) {
  new CronJob('*/5 * * * * *', function() {
    socket.emit('fetchQuestion');
  }, null, true, 'America/Los_Angeles');
});