const mongoose = require('mongoose');
const makeSaveResponse = require('./data-access');
const { saveResponse, findUserData, findAllUserData} = makeSaveResponse()

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

console.log(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`, 'linr 13')

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

const url = process.env.MONGO_URI;

exports.connect = async() => await mongoose.connect(url, options);
exports.saveResponse = prop => saveResponse(prop);
exports.findUserData = prop => findUserData(prop);
exports.findAllUserData = prop => findAllUserData(prop)