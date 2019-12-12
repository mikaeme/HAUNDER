'use strict';
const commentModel = require('../models/commentModel');

const comment_list_get = async (req, res) => {
  const comments = await commentModel.getAllComments();
  await res.json(comments);
};

const comment_get = async (req, res) => {
  console.log('??');
  const comment = await commentModel.getComment(req.params.id);
  await res.json(comment[0]);
};

const create_comment = async(req, res) => {
  console.log(req);
  const params = [
    req.body.text,
  ];
  console.log(params);
  const response = await commentModel.addComment(params);
  await res.json(response);
};

const comment_update_put = async(req, res) => {
  const params = [
    req.body.text,
    req.body.commenterId
  ];
  console.log('update', params);
  const user = await commentModel.updateComment(params);
  await res.json(user);
};

const comment_delete = async(req, res) => {
  const params = [req.params.id];
  console.log('delete', params);
  const post = await commentModel.deleteComment(params);
  await res.json(post);
};

module.exports = {
  comment_list_get,
  create_comment,
  comment_get,
  comment_update_put,
//    comment_delete,
};
