const net = require('net')

const server = net.createServer(socket => {
  socket.write(InvocationHandler.marshaller("Please type your operations exactly like this => '2 + 2'"))
  socket.on('end', () => {
    console.log('A client disconnected')
  })
  socket.on('data', data => {
    try {
      socket.write(InvocationHandler.marshaller("Result: " + processOperation(InvocationHandler.unmarshaller(data))))
    } catch (err) {
      socket.write(InvocationHandler.marshaller(err))
    }
  })
})

class InvocationHandler {

  static unmarshaller(buff) {
    return buff.toString('utf8')
  }

  static marshaller(data) {
    return Buffer.from(data)
  }
}

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

function processOperation(operation) {
  const elems = operation.split(" ")
  return calculate(Number.parseFloat(elems[0]), elems[1], Number.parseFloat(elems[2]))
}

server.listen(3030, '127.0.0.1')
