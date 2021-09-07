const MongoClient = require('mongodb').MongoClient;
const redis = require('redis');
// const fs = require('fs');

// const obj = JSON.parse(fs.readFileSync('parkingLotInfo.json', 'utf8'));

// function insertData(db) {
//   db.collection('Info').insertMany(obj);
// }
const url = 'mongodb+srv://avisahney:helloworld@parkinglot.ffjbl.mongodb.net/parkinglot?retryWrites=true&w=majority';

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log('Database failed to connect');
  }
  console.log('Database connected!');
  global.db = client.db('parkinglot');
});

const redisClient = redis.createClient(6379, (err) => {
  if (err) {
    console.log('redis not connected');
    throw err;
  }
});
console.log('redis connected');

module.exports = {
  redisClient,
};
