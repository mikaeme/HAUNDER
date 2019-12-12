'use strict';
// select existing html elements
const addPost = document.querySelector('#addPostForm');
const timeLine = document.querySelector('#timeline');
const ownPostContainer = document.querySelector('.own-post-container');
const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#image-modal img');
const close = document.querySelector('#image-modal a');

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

        // open large image when clicking image
        img.addEventListener('click', () => {
            modalImage.src = url + '/' + post.pic;
            modalImage.alt = post.title;
            imageModal.classList.toggle('hide');
        });
        //Comment button
        const edit = document.createElement('button');
        edit.innerHTML = `Kommentoi`;
        edit.classList.add('edit-post');
        edit.setAttribute("id", `${post.postId}`);
        
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
        
        edit.addEventListener('click', () => {
            sessionStorage.setItem('postId', post.postId);
            ownCommentContainer.style.display = 'block';
            postContainer.style.display = 'none';
        });

        const li = document.createElement('li');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        li.appendChild(p4);
        li.appendChild(edit);
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

// close modal
close.addEventListener('click', (evt) => {
    evt.preventDefault();
    imageModal.classList.toggle('hide');
});
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
