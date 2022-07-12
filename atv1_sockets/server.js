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
      sendToAll(`${socket.name} entrou no chat`)
    } else {
      if (message === ':q') {
        sendToAll(`${socket.name} saiu`)
        clients = clients.filter(client => client !== socket)
        socket.end()
      } else {
        sendToAll(`[${socket.name}]: ${message}`)
      }
    }
  })

  socket.on('end', () => {
    console.log('A client has been disconnected')
  })

  const sendToAll = (message) => {
    clients.forEach(client => {
      if (client.name === socket.name) return
      client.write(message)
    })
  }

})

server.listen(3030, '127.0.0.1')
