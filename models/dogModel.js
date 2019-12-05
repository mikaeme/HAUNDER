'use strict'
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllDogs = async () => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM haunder_dog;');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
// get the list of dog breeds from the database
const getAllBreeds = async () => {
  try {
    const [rows] =await promisePool.execute(
        'SELECT * FROM breed'
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

// get the list of dog locations from the database
const getAllLocations = async () => {
  try {
    const [rows] =await promisePool.execute(
        'SELECT * FROM location'
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const addDog = async (params) => {
  try {
    const [rows] = await promisePool.execute(
     'INSERT INTO dog (name, gender, activity, ownerId, ' +
        'breed, location, size) VALUES (?,?,?,?,?,?,?);',
        params);
    console.log('params', params);
    return rows;
  } catch (e){
    console.log('error', e.message);
  }
};

module.exports = {
  getAllDogs,
  getAllBreeds,
  getAllLocations,
  addDog,
};