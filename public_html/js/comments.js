'use strict';
const addComment = document.querySelector('#addCommentForm');
const timeLine1 = document.querySelector('#timeline1');
const ownCommentContainer = document.querySelector('.own-comment-container');

//	create comment views

const createCommentCards = (comments) => {

  timeLine1.innerHTML = '';
  comments.forEach((comment) => {

    let date = moment(comment.timestamp).locale('fi').format('LLL');

    const p1 = document.createElement('p');
    p1.innerHTML = `Kommentoija: ${comment.commenterId}`;
    const p2 = document.createElement('p');
    p2.innerHTML = `Aika: ${date}`;
    const p3 = document.createElement('p');
    p3.innerHTML = `Kommentti: ${comment.text}`;

    const li = document.createElement('li');

    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    timeLine.appendChild(li);
  });
};

//          AJAX call

const getComment = async() => {
  try {
    const response = await fetch(url + '/commenting');
    const comments = await response.json();
    createCommentCards(comments);
  } catch (e) {
    console.log(e.message);
  }
};
getComment();

//          submit add comment form

addComment.addEventListener('submit', async(evt) => {
  evt.preventDefault();
  const pdd = serializeJson(addComment);
  // set current user as the commenter
  const currentId = parseInt(sessionStorage.getItem('currentUser'));
  pdd.posterId = '57';
  pdd.commenterId = currentId;
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(pdd),
  };
  console.log(pdd);
  const response = await fetch(url + '/commenting', fetchOptions);
  const json = await response.json();
  console.log('add response', json);
  getComment();
});
