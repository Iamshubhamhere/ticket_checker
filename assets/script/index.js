'use strict';

import { select, print } from './utils.js';


const display = document.querySelector('.display');
const url = './assets/script/cities.json';
const url2 = './assets/script/movies.json';

// fetch function
const options =  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset =UTF-8'},
    mode: 'cors'
}

async function getCities() {
    try{
        const response = await fetch(url, options );
     if (!response.ok){
     throw new Error(`${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    print(data.cities);
    
}
  catch(error){
        print(error.message);
    }
}

async function getMovies() {
    try {
      const response = await fetch(url2, options); 
  
      if (!response.ok) {
        throw new Error(`${response.statusText} (${response.status})`);
      }
  
      const data = await response.json(); 
      showMovies(data.movies);
    } catch(error) {
      alert(error.message);
    }
  }

function showMovies(array) {
    display.innerHTML = '';
  
    if (array.length > 0) {
      array.forEach(image => {
        display.innerHTML += `
        <div class="poster">
          <img class="poster-image" src="${image.image}">
          <div class="poster-name">${image.name}</div>
        </div>
        `;
      });
    }
  }
showMovies();
getCities();
getMovies();