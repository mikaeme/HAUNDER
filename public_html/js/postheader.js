'use strict';

const createDogHeader = (dog) => {
  const ava = document.createElement('img');
  ava.src = url + '/thumbnails/' + dog.profilePic;
  ava.alt = dog.name;
  ava.classList.add('resp');

  const dogName = dog.name;
}

const getDogInfo = async (dogId) => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = fetch(url + '/dog/' + dogId, options);
    const dog = response.json();
    console.log('??!');
    createDogHeader(dog)
  } catch (e) {
    console.log(e.message);
  }
};