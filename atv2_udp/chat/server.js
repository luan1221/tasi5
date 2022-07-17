const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

socket.on('message', (msg, rinfo) => {
    console.log(msg.toString())
    rl.addListener('line', line => {
        socket.send(line, rinfo.port, rinfo.address)
    })
    
})

socket.bind(4002)