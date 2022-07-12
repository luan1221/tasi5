const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

socket.on('message', (msg, rinfo) => {
    console.log(msg.toString())
})

socket.bind(4002)