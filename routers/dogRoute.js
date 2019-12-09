'use strict';
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const dogController = require('../controllers/dogController');

router.get('/', dogController.dog_list_get);
router.get('/:id', dogController.dog_get);

router.get('/breeds', dogController.breed_list_get);
router.get('/locations', dogController.location_list_get);

router.post('/', upload.single('dog'), (req, res, next) => {
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

router.post('/',
 /*   [
    body('name','Pakollinen tieto').isLength({min:1}),
    body('gender', 'Pakollinen tieto').isLength({min:1}),
    body('birthdate','Pakollinen tieto').isLength({min:1}),
    body('weight','Pakollinen tieto').isLength({min:1}),
      body('breed','Pakollinen tieto').isLength({min:1}),
    body('location','Pakollinen tieto').isLength({min:1}),
    sanitizeBody('name').escape(),
    ],*/
    dogController.dog_create_post,
);

module.exports = router;