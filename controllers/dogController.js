'use strict';
const {validationResult} = require('express-validator');
const dogModel = require('../models/dogModel');
const userModel = require('../models/userModel');
const resize = require('../utils/resize');
const imageMeta = require('../utils/imageMeta');

const dog_list_get = async (req, res) => {
  const dogs = await dogModel.getAllDogs();
  await res.json(dogs);
};
const dog_get = async (req, res) => {
  const dog = await dogModel.getDog(req.params.id);
  await res.json(dog[0]);
};

const breed_list_get = async (req, res) => {
  const breeds = await dogModel.getAllBreeds();
  await res.json(breeds);
};

const location_list_get = async (req, res) => {
  const locations = await dogModel.getAllLocations();
  await res.json(locations);
};

const dog_create_post = async (req, res) => {
  const errors = validationResult(req);
  //get current user
  const user = await userModel.getUser;
  console.log(req.body);
  if (!errors.isEmpty()) {
    res.send(errors.array());
  } else {
    try {
     //create thumbnail
      const thumb = await resize.makeThumbnail(req.file.path,
          'thumbnails/' + req.file.filename,
          {width: 160, height: 160});
      console.log('thumb', thumb);

      // get coordinates
      const coords = await imageMeta.getCoordinates(req.file.path);
      console.log('coords', coords);

      const params = [
        req.body.name,
        req.body.gender,
        req.body.activity,
        req.body.breed,
        req.body.location,
        req.body.size,
        req.file.filename,
        req.user.userId,
      ];
      console.log('create', params);
      const dog = await dogModel.addDog(params);
      await res.json({message: 'upload ok'});
    } catch (e) {
      console.log('exif error', e);
      res.status(400).json({message: e.message});
    }
  }
};
module.exports = {
  dog_get,
  dog_list_get,
  breed_list_get,
  location_list_get,
  dog_create_post,
};