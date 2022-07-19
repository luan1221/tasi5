const net = require('net')
const readline = require('readline')

const client = new net.Socket()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

client.connect(3030, '127.0.0.1', () => {
  console.log("Calculator")
  rl.addListener('line', line => {
    client.write(Invoker.marshaller(line))
  })

  client.on('data', data => {
    console.log(Invoker.unmarshaller(data))
  })
})

class Invoker {

  static marshaller(operation) {
    return Buffer.from(operation)

  }
  static unmarshaller(buff) {
    return buff.toString('utf8')
  }
}
