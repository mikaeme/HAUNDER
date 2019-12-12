'use strict';
const goToUser = document.querySelector('.go-to-user');
const goToOwnPosts = document.querySelector('.go-to-own-posts');
const goToRegister = document.querySelector('.go-to-reg');
const goToLogin = document.querySelector('.go-to-login');
const goToPosts = document.querySelector('.go-to-posts');

//          Go to user info view

goToUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  loginWrapper.style.display = 'none';
  registerWrapper.style.display = 'none';
  main.style.display = 'block';
  postContainer.style.display = 'none';
});
//          Go to own posts view

goToOwnPosts.addEventListener('click', async (evt) => {
  evt.preventDefault();
  loginWrapper.style.display = 'none';
  registerWrapper.style.display = 'none';
  main.style.display = 'none';
  postContainer.style.display = 'none';
  ownPostContainer.style.display = 'block';
  getOwnPosts();
});
//          Go to register form

goToRegister.addEventListener('click', async (evt) => {
  evt.preventDefault();
  loginWrapper.style.display = 'none';
  registerWrapper.style.display = 'block';
  postContainer.style.display = 'none';
});
//          Go to login form

goToLogin.addEventListener('click', async (evt) => {
  evt.preventDefault();
  loginWrapper.style.display = 'block';
  registerWrapper.style.display = 'none';
  postContainer.style.display = 'none';
});
//          Go to feed view

goToPosts.addEventListener('click', async (evt) => {
  evt.preventDefault();
  loginWrapper.style.display = 'none';
  registerWrapper.style.display = 'none';
  main.style.display = 'none';
  ownPostContainer.style.display = 'none';
  postContainer.style.display = 'block';
  logOut.style.display = 'block';
});