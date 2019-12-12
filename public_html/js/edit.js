'use strict';
const ownPosts = document.querySelector('#own-posts');
const editWrapper = document.querySelector('.edit-wrapper');
const editForm = document.querySelector('#edit-post-form');

//            Create dog cards

const createOwnPosts = (posts) => {
  const currentId = parseInt(sessionStorage.getItem('currentUser'));
  console.log(currentId);
  ownPosts.innerHTML = '';
  posts.forEach((post) => {
    //show only current user´s dogs
    if (post.posterId === currentId) {
      const img = document.createElement('img');
      img.src = url + '/' + post.pic;
      img.alt = post.title;
      img.classList.add('resp');

      const edit = document.createElement('button');
      edit.innerHTML = `Edit`;
      edit.classList.add('edit-post');
      edit.setAttribute("id", `${post.postId}`);
      const figure = document.createElement('figure').appendChild(img);

      const h2 = document.createElement('h2');
      h2.innerHTML = post.title;
      const p1 = document.createElement('p');
      p1.innerHTML = `Poster: ${post.posterDog}`;
      const p2 = document.createElement('p');
      p2.innerHTML = `Date: ${post.timestamp}`;
      const p3 = document.createElement('p');
      p3.innerHTML = `Location: ${post.location}`;
      const p4 = document.createElement('p');
      p4.innerHTML = post.text;

      edit.innerHTML = 'Edit';
      edit.addEventListener('click', () => {
        console.log('???');
        editWrapper.style.display = 'block';
        const inputs = editForm.querySelectorAll('input');
 //       inputs[0].value = post.posterDog;
        inputs[0].value = post.title;
        inputs[1].value = post.text;
        inputs[2].value = post.postId;
        editForm.querySelector('select').value = post.locationId;
        console.log(editForm);
      });

      const li = document.createElement('li');

      li.appendChild(h2);
      li.appendChild(figure);
      li.appendChild(p1);
      li.appendChild(p2);
      li.appendChild(p3);
      li.appendChild(p4);
      li.appendChild(edit);
      ownPosts.appendChild(li);
    }
  })
};

//        AJAX call

const getOwnPosts = async () => {
  try {
    const response = await fetch(url + '/posting');
    const posts = await response.json();
    createOwnPosts(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getOwnPosts();


// submit modify form
editForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const data = serializeJson(editForm);
    const fetchOptions = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    console.log(fetchOptions);
    const response = await fetch(url + '/posting', fetchOptions);
    const json = await response.json();
    console.log('modify response', json);
    getPost();
});
