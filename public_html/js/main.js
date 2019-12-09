'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const ul = document.querySelector('ul');

const getPost = async() => {
  const response = await fetch(url + '/post');
  const posts = await response.json();
  for (const post of posts) {
    const post = await getPost(post.owner);
    ul.innerHTML += `
    <li>
        <h2>${post.title}</h2>
        <figure>
            <img src="${post.postnumber}" class="resp">
        </figure>
        <p>Poster: ${post.userId}</p>
        <p>Date: ${post.date}</p>
        <p>Title: ${post.title}kg</p>
        <p>Text: ${post.text}</p>
        <p>Text: ${post.wallUserId}</p>
    </li>
    `;
  }
};

const getPost = async(id) => {
  const response = await fetch(url + '/user/' + id);
  const user = await response.json();
  return user;
};

getPost();