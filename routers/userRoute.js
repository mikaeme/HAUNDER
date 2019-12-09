'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body, sanitizeBody } = require('express-validator');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.put('/', (req,res) => {
  res.send('With this endpoint you can edit users.');
});

router.delete('/', (req,res) => {
  res.send('With this endpoint you can delete users.');

});

module.exports = router;