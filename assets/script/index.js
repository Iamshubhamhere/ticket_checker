'use strict';

import { select, print } from './utils.js';


const display = document.querySelector('.display');
const cityUrl = './assets/script/cities.json';
const movieUrl = './assets/script/movies.json';
const movieSearch = document.querySelector('.movieSearch');
const citySearch = document.querySelector('.citySearch');

// fetch function
const options =  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset =UTF-8'},
    mode: 'cors'
}

async function getCities() {
    try{
        const response = await fetch(cityUrl, options );
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
      const response = await fetch(movieUrl, options); 
  
      if (!response.ok) {
        throw new Error(`${response.statusText} (${response.status})`);
      }
  
      const data = await response.json(); 
    
      showMovies(data.movies);
      // print(showMovies);
    } catch(error) {
      alert(error.message);
    }
  }

function showMovies(array) {
    display.innerHTML = '';
  
    if (array.length > 0) {
      array.forEach(movies => {
        display.innerHTML += `
        <div class="poster">
          <img class="poster-image" src="${movies.image}">
          <div class="poster-name">${movies.name}</div>
        </div>
        `;
      });
    }
  }

getCities();
getMovies();