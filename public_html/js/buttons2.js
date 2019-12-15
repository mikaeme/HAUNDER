'use strict';
const goToUser = document.querySelector('.entypo-cog');
const goToOwnPosts = document.querySelector('.entypo-search');
const goToRegister = document.querySelector('.go-to-reg');
const goToLogin = document.querySelector('.go-to-login');
const goToPosts = document.querySelectorAll('.topnav_logo');

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
});
//          Go to register form

goToRegister.addEventListener('click', async (evt) => {
  evt.preventDefault();
  loginWrapper.style.display = 'none';
  registerWrapper.style.display = 'flex';
  postContainer.style.display = 'none';
});
//          Go to login form

goToLogin.addEventListener('click', async (evt) => {
  evt.preventDefault();
  loginWrapper.style.display = 'flex';
  registerWrapper.style.display = 'none';
  postContainer.style.display = 'none';
});

//          Go to feed view
goToPosts.forEach((nappi) => {
  nappi.addEventListener('click', async (evt) => {
    evt.preventDefault();
    console.log('??');
    loginWrapper.style.display = 'none';
    registerWrapper.style.display = 'none';
    main.style.display = 'none';
    ownPostContainer.style.display = 'none';
    postContainer.style.display = 'block';
    logOut.style.display = 'block';
  });
});