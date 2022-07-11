const net = require('net')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

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

  rl.addListener('line', line => {
    socket.write(line)
  })
}

const server  = net.createServer(handleConnection)
server.listen(3030, '127.0.0.1')
