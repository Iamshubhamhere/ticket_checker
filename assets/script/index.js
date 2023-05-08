'use strict';

import { select, print } from './utils.js';


const display = document.querySelector('.display');
const cityUrl = './assets/script/cities.json';
const movieUrl = './assets/script/movies.json';





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



const movieSearch = document.querySelector('.movieSearch');
const movieList = document.querySelector('.movieList');

movieSearch.addEventListener('input', async () => {
  if (movieSearch.value.length > 1) {
      const inputValue = movieSearch.value.toLowerCase();

      movieList.innerHTML = '';

      const response = await fetch(movieUrl, options);
      if (!response.ok) {
          throw new Error(`${response.statusText} (${response.status})`)
      }
      const data = await response.json();
      const movieTitles = [];
      for (let i = 0; i < data.movies.length; i++) {
          let movieName = data.movies[i].name;
          movieTitles.push(movieName);
      }
      
      const filteredMovies = movieTitles.filter(movie => {
          return movie.toLowerCase().includes(inputValue);
      })

      if (filteredMovies.length > 0) {
          filteredMovies.forEach(movie => {
              const newResult = document.createElement('a');
              newResult.href = '#';
              newResult.textContent = movie;
             
              movieList.appendChild(newResult);
          })
      } else {
          const defaultResult = document.createElement('a');
          defaultResult.href = '#';
          defaultResult.textContent = 'Movie not found';
          movieList.appendChild(defaultResult);
      }
  } else {
    movieList.innerHTML = '';
  }
});

const citySearch = select('.citySearch');
const cityList = select('.cityList');

citySearch.addEventListener('input', async () => {
  if (citySearch.value.length > 1) {
      const inputValue = citySearch.value.toLowerCase();

      cityList.innerHTML = '';

      const response = await fetch(cityUrl, options);
      if (!response.ok) {
          throw new Error(`${response.statusText} (${response.status})`)
      }
      const data = await response.json();
      const cityName = [];
      for (let i = 0; i < data.cities.length; i++) {
          let movieName = data.cities[i].name;
          cityName.push(movieName);
      }
      
      const filteredMovies = cityName.filter(city => {
          return city.toLowerCase().includes(inputValue);
      })

      if (filteredMovies.length > 0) {
          filteredMovies.forEach(city => {
              const newResult = document.createElement('a');
              newResult.href = '#';
              newResult.textContent = city;
             
              cityList.appendChild(newResult);
          })
      } else {
          const defaultResult = document.createElement('a');
          defaultResult.href = '#';
          defaultResult.textContent = 'City not found';
          cityList.appendChild(defaultResult);
      }
  } else {
    cityList.innerHTML = '';
  }
});

