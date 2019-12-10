'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const postController = require('../controllers/postController');


router.get('/', postController.post_list_get);
router.get('/:id', postController.post_get);

router.post('/', upload.single('pic'), postController.create_post);
//router.post('/', postController.create_post);

// req.file is the `avatar` file
// req.body will hold the text fields, if there were any
//})


//router.put('/', postController.post_update_put);

//router.delete('/:id', postController.post_delete);

module.exports = router;