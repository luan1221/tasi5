const net = require('net')

let clients = []

const server = net.createServer(socket => {

  console.log("We had a connection!")

  socket.allowMessages = false

  socket.write('Welcome to chat, please type your name')

  socket.on('data', data => {

    const message = data.toString()

    if (!socket.allowMessages) {
      socket.name = message
      clients.push(socket)
      socket.allowMessages = true
    } else {
      if (message === ':q') {
        clients = clients.filter(client => client !== socket)
        socket.end()
      }
      clients.forEach(client => {
        if (client.name === socket.name) return
        client.write(`[${socket.name}]: ${message}`)
      })
    }
  })

  socket.on('end', () => {
    console.log('A client has been disconnected')
  })

})

server.listen(3030, '127.0.0.1')
