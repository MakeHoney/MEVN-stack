const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.get('/', (req, res, next) => {
  Post.find({}, 'title description', (err, posts) => {
    if(err) res.send({ success: false });
    res.send({
      posts: posts
    });
  }).sort( {_id: -1 });
});


router.post('/', (req, res, next) => {
  let db = req.db;
  let title = req.body.title;
  let description = req.body.description;
  let newPost = new Post({
    title,
    description
  });

  newPost.save(err => {
    if(err) res.send({ success: false });
    res.send({
      success: true,
      message: 'Post saved successfully!'
    });
  });
});

router.get('/:id/edit', (req, res, next) => {
  let db = req.db;
  Post.findById(req.params.id, 'title description', (err, post) => {
    if(err) res.send({ success: false });
    res.send(post);
  });
});

router.put('/:id/edit', (req, res, next) => {
  let db = req.db;
  Post.findById(req.params.id, 'title description', (err, post) => {
    if(err) res.send({ success: false });
    post.title = req.body.title;
    post.description = req.body.description;
    post.save(err => {
      if(err) res.send({ success: false });
      res.send({ success: true });
    });
  });
});

router.delete('/:id', (req, res, next) => {
  let db = req.db;
  Post.remove({
    _id: req.params.id
  }, (err, post) => {
    if(err) res.send({ success: false });
    res.send({ success: true });
  });
});

module.exports = router;
