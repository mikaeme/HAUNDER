'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async() => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT post.*, dog.name as "posterDog"' +
            'FROM post JOIN dog ON dog.dogId = post.posterId');
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return { error: 'error in database query' };
    }
};

const getPost = async(id) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM post WHERE postId = ?;',
            [id],
        );
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return { error: 'error in database query' };
    }
};

const addPost = async(params) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO post (posterId, pic, timestamp, title, text, locationId) VALUES (?, ?, ?, ?, ?, ?);',
            params,
        );
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return { error: 'error in database query' };
    }
};

const updatePost = async(params) => {
    try {
        const [rows] = await promisePool.execute(
            'UPDATE post SET posterId = ?, pic = ?, timestamp = ?, title = ?, text = ?, locationId = ? WHERE postId = ?;',
            params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

const deletePost = async(params) => {
    try {
        const [rows] = await promisePool.execute(
            'DELETE FROM post WHERE post_id = ?;',
            params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

module.exports = {
    getAllPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,
};