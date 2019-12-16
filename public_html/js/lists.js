'use strict';

const breedList = document.querySelectorAll('.add-breed');
const locationList = document.querySelectorAll('.add-location');
const ownDogList = document.querySelectorAll("#own-dog-list");

//        Create breed options to <select>

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

//        Get the list of breeds

const getBreeds = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/form/breeds', options);
    const breeds = await response.json();
    createBreedOptions(breeds);
  } catch (e) {
    console.log(e.message);
  }
};
//          Create location options to <select>

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

//          Get the list of locations

const getLocations = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/form/locations', options);
    const locations = await response.json();
    createLocationOptions(locations);
  } catch (e) {
    console.log(e.message);
  }
};

//          Create dogs to <select>

const createOwnDogOptions = (dogs) => {
  const currentId = parseInt(sessionStorage.getItem('currentUser'));
  ownDogList.forEach((list) => {
    list.innerHTML='';
    dogs.forEach((dog) => {
      if (dog.ownerId === currentId) {
        const option = document.createElement('option');
        option.value = dog.name;
        option.innerHTML = dog.name;
        list.appendChild(option);
      }
    });
  });
};

//          Get the list of dogs

const getOwnDogs = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/dog', options);
    const dogs = await response.json();
    createOwnDogOptions(dogs);
  } catch (e) {
    console.log(e.message);
  }
};
getBreeds();
getLocations();
getOwnDogs();