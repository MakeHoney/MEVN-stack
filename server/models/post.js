const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: String,
  description: String
});

let Post = mongoose.model('post', PostSchema);
module.exports = Post;
