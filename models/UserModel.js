'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM user;');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM user WHERE user_id = ?;',
        [id]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const addUser = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO user (username, password) VALUES (?, ?);',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getUserLogin = async (params) => {
  try {
    console.log('losername', params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM user WHERE username = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
module.exports = {
  getAllUsers,
  getUser,
  addUser,
  getUserLogin,
};