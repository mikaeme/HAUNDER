'use strict';
const url = 'http://localhost:3000/dog';
const breedList = document.querySelectorAll('.add-breed');
const locationList = document.querySelectorAll('.add-location');
const addForm = document.querySelector('#add-dog-form');

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
    const response = await fetch(url + '/breeds', options);
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
    const response = await fetch(url + '/locations', options);
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
