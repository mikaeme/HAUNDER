'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const postController = require('../controllers/postController');


router.get('/', postController.post_list_get);
router.get('/:id', postController.post_get);

router.post('/', upload.single('pic'), (req, res, next) => {
  console.log('dog post file', req.file);
  if (req.file === undefined) {
    res.json({
      error: 'No file',
    });
  } else if(!req.file.mimetype.includes('image')){
    res.json({
      error: 'Not an image',
    });
  } else {
    next();
  }
});

router.post('/', postController.create_post);

// req.file is the `avatar` file
// req.body will hold the text fields, if there were any
//})


router.put('/', postController.post_update_put);

//router.delete('/:id', postController.post_delete);

module.exports = router;