const net = require('net')

const handleConnection = socket => {
  console.log("We had a connection!")
  socket.on('end', () => {
    console.log('A client disconnected')
  })
  socket.on('data', data => {
    const str = data.toString()
    if (str === 'end') {
      socket.end()
    }
    console.log(str)
  })
}

const server  = net.createServer(handleConnection)
server.listen(3030, '127.0.0.1')
