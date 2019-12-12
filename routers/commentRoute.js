'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const commentController = require('../controllers/commentController');


router.get('/', commentController.comment_list_get);
router.get('/:id', commentController.comment_get);

router.post('/', commentController.create_comment);
//router.post('/', postController.create_post);

// req.file is the `avatar` file
// req.body will hold the text fields, if there were any
//})


router.put('/', commentController.comment_update_put);

//router.delete('/:id', postController.post_delete);

module.exports = router;
