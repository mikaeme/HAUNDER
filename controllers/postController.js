'use strict';
const postModel = require('../models/postModel');

const post_list_get = async (req, res) => {
    const posts = await postModel.getAllPosts();
    await res.json(posts);
};

const post_get = async (req, res) => {
    console.log('??');
    const post = await postModel.getPost(req.params.id);
    await res.json(post[0]);
};

const create_post = async(req, res) => {
    console.log(req)
    const params = [
        req.body.posterId,
        req.file.filename,
        req.body.title,
        req.body.text,
        req.body.locationId,
    ];
    const response = await postModel.addPost(params);
    await res.json(response);
};
/*
const post_update_put = async(req, res) => {
    const params = [
        //req.body.userId,
        req.file,
        //req.body.timestamp,
        req.body.title,
        req.body.text,
        //req.body.wallUserId,
    ];
    console.log('update', params);
    const user = await postModel.updatePost(params);
    await res.json(user);
};

const post_delete = async(req, res) => {
    const params = [req.params.id];
    console.log('delete', params);
    const post = await postModel.deletePost(params);
    await res.json(post);
};
*/
module.exports = {
    post_list_get,
    create_post,
    post_get,
//    post_update_put,
//    post_delete,
};