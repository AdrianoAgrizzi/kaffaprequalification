const port = process.env.PORT_SERVER || 3000

const express = require('express')
const server = express()

server.use('/data', express.static(__dirname + '/data'));

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server

require('./routes')(server)
