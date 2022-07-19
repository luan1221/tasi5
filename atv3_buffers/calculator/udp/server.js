const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

socket.on('message', (msg, rinfo) => {
    try {
        socket.send(
            InvocationHandler.marshaller("Result: " + processOperation(InvocationHandler.unmarshaller(msg))), 
            rinfo.port, 
            rinfo.address
        )
    } catch (err) {
        socket.send(InvocationHandler.marshaller(err), rinfo.port, rinfo.address)
    }
})

class InvocationHandler {

    static unmarshaller(buff) {
      return buff.toString('utf8')
    }
  
    static marshaller(data) {
      return Buffer.from(data)
    }
}

function processOperation(operation) {
    const elems = operation.split(" ")
    return calculate(Number.parseFloat(elems[0]), elems[1], Number.parseFloat(elems[2]))
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

socket.bind(4002)