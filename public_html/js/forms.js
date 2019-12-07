'use strict';
const url = 'http://localhost:3000';
const loginWrapper = document.querySelector('#login-wrapper');
const userInfo = document.querySelector('#user-info');
const logOut = document.querySelector('#log-out');
const main = document.querySelector('main');
const loginForm = document.querySelector('#login-form');
const ul = document.querySelector('ul');
const addUserForm = document.querySelector('#add-user-form');
const breedList = document.querySelectorAll('.add-breed');
const locationList = document.querySelectorAll('.add-location');
const addForm = document.querySelector('#add-dog-form');


// Create dog cards
const createDogCards = (dogs) => {
  //clear ul
  ul.innerHTML = '';
  dogs.forEach((dog) => {
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + dog.filename;
    img.alt = dog.name;
    img.classList.add('resp');

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = dog.name;

    const p1 = document.createElement('p');
    p1.innerHTML = `Sukupuoli: ${dog.gender}`;

    const p2 = document.createElement('p');
    p2.innerHTML = `Koko: ${dog.size}`;

    const p3 = document.createElement('p');
    p3.innerHTML = `Rotu: ${dog.breed}`;

    const li = document.createElement('li');
    li.classList.add('dog-form');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    ul.appendChild(li);
  });
};

// AJAX call

const getDog = async () => {
  console.log('getDog token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/dog', options);
    const dogs = await response.json();
    createDogCards(dogs);
  }
  catch (e) {
    console.log(e.message);
  }
};

// create breed options to <select>
const createBreedOptions = (breeds) => {

  breedList.forEach((list) => {
    list.innerHTML='';
    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.breedId;
      option.innerHTML = breed.breed;
      list.appendChild(option);
    });
  });
};

// get breeds
const getBreeds = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/dog/breeds', options);
    const breeds = await response.json();
    console.log('breeds:', breeds);
    createBreedOptions(breeds);
  } catch (e) {
    console.log(e.message);
  }
};
// create location options to <select>
const createLocationOptions = (locations) => {

  locationList.forEach((list) => {
    list.innerHTML='';
    locations.forEach((location) => {
      const option = document.createElement('option');
      option.value = location.locationId;
      option.innerHTML = location.location;
      list.appendChild(option);
    });
  });
};

//get locations
const getLocations = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/dog/locations', options);
    const locations = await response.json();
    createLocationOptions(locations);
  } catch (e) {
    console.log(e.message);
  }
};

getBreeds();
getLocations();

// submit dog form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new serializeJson(addForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fd),
  };
  const response = await fetch(url + '/', fetchOptions);
  const json = await response.json();
  console.log('add response', json);
});

// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    // show/hide forms + dogs
    loginWrapper.style.display = 'none';
    logOut.style.display = 'block';
    main.style.display = 'block';
    userInfo.innerHTML = `Hello ${json.user.name}`;
    getDog();
    getUsers();
  }
});

// logout
logOut.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/auth/logout', options);
    const json = await response.json();
    console.log(json);
    // remove token
    sessionStorage.removeItem('token');
    alert('You have logged out');
    // show/hide forms + dogs
    loginWrapper.style.display = 'block';
    logOut.style.display = 'none';
    main.style.display = 'none';
  }
  catch (e) {
    console.log(e.message);
  }
});

// submit register form
addUserForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(addUserForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  console.log('user add response', json);
  // save token
  sessionStorage.setItem('token', json.token);
  // show/hide forms + dogs
  loginWrapper.style.display = 'none';
  logOut.style.display = 'block';
  main.style.display = 'block';
  userInfo.innerHTML = `Hello ${json.user.username}`;
  getDog();
  getUsers();
});

// when app starts, check if token exists and hide login form, show logout button and main content, get cats and users
if (sessionStorage.getItem('token')) {
  console.log('logged in');
  loginWrapper.style.display = 'none';
  logOut.style.display = 'block';
  main.style.display = 'block';
  getDog();
  getUsers();
};