'use strict';
// select existing html elements
const addPost = document.querySelector('#addPostForm');
const timeLine = document.querySelector('#timeline');
const ownPostContainer = document.querySelector('.own-post-container');


//          create post views

const createPostCards = (posts) => {
    // clear timeline
    timeLine.innerHTML = '';
    posts.forEach((post) => {
        // create li with DOM methods
        const img = document.createElement('img');
        img.src = url + '/' + post.pic;
        img.alt = post.title;
        img.classList.add('resp');
        
        let date = moment(post.timestamp).locale('fi').format('LLL');

        const figure = document.createElement('figure').appendChild(img);

        const h2 = document.createElement('h2');
            h2.innerHTML = post.title;
        const p1 = document.createElement('p');
            p1.innerHTML = `Poster: ${post.posterDog}`;
        const p2 = document.createElement('p');
            p2.innerHTML = `Date: ${date}`;
        const p3 = document.createElement('p');
            p3.innerHTML = `Location: ${post.location}`;
        const p4 = document.createElement('p');
            p4.innerHTML = post.text;

        const li = document.createElement('li');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        li.appendChild(p4);
        timeLine.appendChild(li);
    });
};

//          AJAX call

const getPost = async() => {
    try {
        const response = await fetch(url + '/posting');
        const posts = await response.json();
        createPostCards(posts);
    } catch (e) {
        console.log(e.message);
    }
};
getPost();

//          submit add post form

addPost.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const pd = new FormData(addPost);
    // set current user as the poster
    const currentId = parseInt(sessionStorage.getItem('currentUser'));
    pd.set('posterId', currentId);
    const fetchOptions = {
        method: 'POST',
        body: pd,
    };
    const response = await fetch(url + '/posting', fetchOptions);
    const json = await response.json();
    console.log('add response', json);
    getPost();
});
