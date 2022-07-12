const net = require('net')

let clients = []

const handleConnection = socket => {
  console.log("We had a connection!")

  socket.allowMessages = false

  socket.write('Welcome to chat, please type your name')

  socket.on('end', () => {
    console.log('A client has been disconnected')
  })

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
}

// const find = (socket) => {
//   clients.forEach(client => {
//     if (client == socket) return true
//   })
//   return false
// }

const server = net.createServer(handleConnection)

server.listen(3030, '127.0.0.1')
