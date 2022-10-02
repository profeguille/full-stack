const mongoose = require('mongoose');

function connectMongoose() {
  mongoose
    .connect('mongodb://localhost:27017/testLogin')
    .then(() => {
      console.log('Connected to Mongo');
    })
    .catch((e) => {
      console.error(e);
      throw new Error('can not connect to the Mongo');
    });
}
module.exports = { connectMongoose };
