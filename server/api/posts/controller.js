const Post = require('../../models/post');

// GET /posts
exports.loadPostlist = (req, res, next) => {
  Post.find({}, 'title description', (err, posts) => {
    if(err) res.send({ success: false });
    res.send({
      posts: posts
    });
  }).sort( {_id: -1 });
};


// GET /posts/:id/edit
exports.loadPostProperty = (req, res, next) => {
  let db = req.db;
  Post.findById(req.params.id, 'title description', (err, post) => {
    if(err) res.send({ success: false });
    res.send(post);
  });
}

// POST /posts
exports.saveNewPost = (req, res, next) => {
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
};

// PUT /posts/:id/edit
exports.saveEditPost = (req, res, next) => {
  let db = req.db;
  console.log("asdfkljalksdjfkljasdklfjksadf");
  Post.findById(req.params.id, 'title description', (err, post) => {
    if(err) res.send({ success: false });
    post.title = req.body.title;
    post.description = req.body.description;
    post.save(err => {
      if(err) res.send({ success: false });
      res.send({ success: true });
    });
  });
};

// DELETE /posts/:id
exports.deletePost = (req, res, next) => {
  let db = req.db;
  Post.remove({
    _id: req.params.id
  }, (err, post) => {
    if(err) res.send({ success: false });
    res.send({ success: true });
  });
};
