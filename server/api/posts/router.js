const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.get('/', controller.loadPostlist);

router.post('/', controller.saveNewPost);

router.get('/:id/edit', controller.loadPostProperty);

router.put('/:id/edit', controller.saveEditPost);

router.delete('/:id', controller.deletePost);

module.exports = router;
