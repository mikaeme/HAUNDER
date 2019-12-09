'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const postController = require('../controllers/postController');


router.get('/', postController.post_list_get);

router.get('/:id', postController.post_get);


router.post('/', postController.create_post);

//router.post('/', upload.single('photo'), function(req, res, next) {
// req.file is the `avatar` file
// req.body will hold the text fields, if there were any
//})

router.post('/', upload.single('photo'), postController.create_post);
//router.put('/', postController.post_update_put);

router.delete('/:id', postController.post_delete);

module.exports = router;