const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

socket.connect(4002, '127.0.0.1', () => {
    console.log("Calculator")
    console.log("Please type your operations exactly like this => '2 + 2'")
    rl.addListener('line', line => {
        socket.send(line)
    })
})

socket.on('message', (msg, rinfo) => {
    console.log(msg.toString())
})