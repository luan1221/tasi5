const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const prompt = require('prompt-sync')()

const packageDef = protoLoader.loadSync("calculator.proto", {})
const grpcObj = grpc.loadPackageDefinition(packageDef)
const calcPackage = grpcObj.calcPackage;

const client = new calcPackage.Calculator("localhost:7500", grpc.credentials.createInsecure())
console.log('Calculadora!!')


(function calculate() {
  const n1 = prompt("Digite o primeiro numero: ")
  const n2 = prompt("Digite o segundo numero: ")
  const op = prompt("Digite a operacao desejada: '+ | - | * | /' ")
  client.sendResult({
    "firstNumber": n1,
    "secondNumber": n2,
    "operationType": op,
  }, (err, response) => {
    console.log("Result: " + response.resultNumber)
  })
})()
