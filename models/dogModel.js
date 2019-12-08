'use strict'
const pool = require('../database/db');
const promisePool = pool.promise();

const getDog = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM dog WHERE dogId = ?;',
        [id]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const getAllDogs = async () => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM dog;');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
// get the list of dog breeds from the database
const getAllBreeds = async () => {
  try {
    const [rows] =await promisePool.execute(
        'SELECT * FROM breed;');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
// get the list of locations from the database
const getAllLocations = async () => {
  try {
    const [rows] =await promisePool.execute(
        'SELECT * FROM location;');
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
  getDog,
  getAllDogs,
  getAllBreeds,
  getAllLocations,
  addDog,
};