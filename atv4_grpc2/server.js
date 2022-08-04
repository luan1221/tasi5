const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

const packageDef = protoLoader.loadSync("calculator.proto", {})
const grpcObj = grpc.loadPackageDefinition(packageDef)
const calcPackage = grpcObj.calcPackage;