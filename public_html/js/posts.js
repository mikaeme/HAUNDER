'use strict';
//const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const addPost = document.querySelector('#addPostForm');
const goToUser = document.querySelector('#go-to-user');
const timeLine = document.querySelector('#timeline');
//const modForm = document.querySelector('#modPostForm');

// create post views
const createPostCards = (posts) => {
    // clear timeline
    timeLine.innerHTML = '';
    posts.forEach((post) => {
        // create li with DOM methods
        const img = document.createElement('img');
        img.src = url + '/' + post.pic;
        img.alt = post.title;
        img.classList.add('resp');

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

        const li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        li.appendChild(p4);
        timeLine.appendChild(li);

      /*  // add selected cat's values to modify form
        const modButton = document.createElement('button');
        modButton.innerHTML = 'Modify';
        modButton.addEventListener('click', () => {
            const inputs = modForm.querySelectorAll('input');
            inputs[0].value = post.ownerId;
            inputs[1].value = post.date;
            inputs[2].value = post.title;
            inputs[3].value = post.text;
            inputs[3].value = post.wallOwnerId;
            modForm.querySelector('select').value = post.ownerId;
        });

        // delete selected cat
        const delButton = document.createElement('button');
        delButton.innerHTML = 'Delete';
        delButton.addEventListener('click', async() => {
            const fetchOptions = {
                method: 'DELETE',
            };
            try {
                const response = await fetch(url + '/post/' + post.post_id, fetchOptions);
                const json = await response.json();
                console.log('delete response', json);
                gePost();
            } catch (e) {
                console.log(e.message());
            }
        });

        const li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        li.appendChild(p4);
        li.appendChild(p5);
        ul.appendChild(li);*/
    });
};

// AJAX call
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

//          Go to main view

goToUser.addEventListener('click', async (evt) => {
    evt.preventDefault();
    loginWrapper.style.display = 'none';
    registerWrapper.style.display = 'none';
    main.style.display = 'block'
    postContainer.style.display = 'none';

});


/*

// create user options to <select>
const createUserOptions = (users) => {
    userLists.forEach((list) => {
        // clear user list
        list.innerHTML = '';
        users.forEach((user) => {
            // create options with DOM methods
            const option = document.createElement('option');
            option.value = user.user_id;
            option.innerHTML = user.name;
            option.classList.add('light-border');
            list.appendChild(option);
        });
    });
};

// get users to form options
const getUsers = async() => {
    try {
        const response = await fetch(url + '/user');
        const users = await response.json();
        createUserOptions(users);
    } catch (e) {
        console.log(e.message);
    }
};
getUsers();
*/
// submit add post form
addPost.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const pd = new FormData(addPost);
    const fetchOptions = {
        method: 'POST',
        body: pd,
    };
    const response = await fetch(url + '/posting', fetchOptions);
    const json = await response.json();
    console.log('add response', json);
    getPost();
});
/*
// submit modify form
modForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const data = serializeJson(modForm);
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
    const response = await fetch(url + '/post', fetchOptions);
    const json = await response.json();
    console.log('modify response', json);
    getPost();
});*/