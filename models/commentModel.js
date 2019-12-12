'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllComments = async() => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT comment.*, user.username as "commenterId", ' +
        'FROM comment JOIN user ON user.userId = comment.commenterId ' +
        'ORDER BY commentId DESC;');
    return rows;
  } catch (e) {
    console.log('error', e.message);
    return { error: 'error in database query' };
  }
};

const getComment = async(id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM comment WHERE commentId = ?;',
        [id],
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
    return { error: 'error in database query' };
  }
};

const addComment = async(params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO comment (timestamp,  text) VALUES (CURRENT_TIMESTAMP(),  ?);',
        params,
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
    return { error: 'error in database query' };
  }
};

const updateComment = async(params) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE comment SET text = ? WHERE commentId = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const deleteComment = async(params) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM comment WHERE commentId = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
};
