'use strict'
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const dogController = require('../controllers/dogController');

router.get('/breeds', dogController.breed_list_get);
router.get('/locations', dogController.location_list_get);

module.exports = router;