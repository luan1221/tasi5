const net = require('net')

function calculate(n1, op, n2) {
  let result = null
  switch (op) {
    case '+':
      result = n1 + n2
      return result.toString()
    case '-':
      result = n1 - n2
      return result.toString()
    case '*':
      result = n1 * n2
      return result.toString()
    case '/':
      if (n2 === 0) {
        throw "Error: div by 0 not permitted"
      } else {
        result = n1 / n2
        return result.toString()
      }
    default:
      throw "Error: operation not recognized"
  }
}

const server = net.createServer(socket => {
  socket.write("Please type your operations exactly like this => '2 + 2'")
  socket.on('end', () => {
    console.log('A client disconnected')
  })
  socket.on('data', data => {
    try {
      const elems = data.toString().split(" ")
      const n1 = Number.parseFloat(elems[0])
      const op = elems[1]
      const n2 = Number.parseFloat(elems[2])
      socket.write("Result: " + calculate(n1, op, n2))
    } catch (err) {
      socket.write(err)
    }
  })
})

server.listen(3030, '127.0.0.1')
