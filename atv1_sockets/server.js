const net = require('net')

let clients = []

const handleConnection = socket => {
  console.log("We had a connection!")
  socket.write('Welcome to chat, please type your name before your messages')
  
  clients.push(socket)
  
  socket.on('end', () => {
    console.log('A client has been disconnected')
  })

  socket.on('data', data => {
    const message = data.toString()
    if (message === 'end') {
      socket.end()
    }
    clients.forEach(client => {
      if (client === socket) return 
      client.write(message)
    })
  })
}

const server = net.createServer(handleConnection)

server.listen(3030, '127.0.0.1')
