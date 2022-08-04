const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

const packageDef = protoLoader.loadSync("calculator.proto", {})
const grpcObj = grpc.loadPackageDefinition(packageDef)
const calcPackage = grpcObj.calcPackage;

const server = new grpc.Server()
server.bind("0.0.0.0:7500", grpc.ServerCredentials.createInsecure())
server.addService(calcPackage.Calculator.service, 
  {
    "sendResult": sendResult
  })
server.start()

function sendResult(call, callback) {
  let n1 = call.request.firstNumber
  let n2 = call.request.secondNumber
  let op = call.request.operationType
  
  callback(null, {
    "resultNumber": calculate(n1, n2, op)
  })
}

function calculate(n1, n2, op) {
  let result = null
  switch (op) {
    case '+':
      result = n1 + n2
      return result
    case '-':
      result = n1 - n2
      return result
    case '*':
      result = n1 * n2
      return result
    case '/':
      result = n1 / n2
      return result
    default:
      return result
  }
}

