const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/posts');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', callback => console.log('Connection Succeeded'));

module.exports = db;
