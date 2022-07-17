const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

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

socket.on('message', (msg, rinfo) => {
    

    try {
        const elems = msg.toString().split(" ")
        const n1 = Number.parseFloat(elems[0])
        const op = elems[1]
        const n2 = Number.parseFloat(elems[2])
        socket.send(calculate(n1, op, n2), rinfo.port, rinfo.address)
    } catch (err) {
        socket.send(err, rinfo.port, rinfo.address)
    }
})

socket.bind(4002)