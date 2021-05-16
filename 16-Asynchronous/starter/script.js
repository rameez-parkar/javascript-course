'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function(data, className = '') {
  const html = `
    <article class="grid-item country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} million</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
}

const getCountryAndNeighboursData = function(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}?fullText=true`);
  request.send();

  request.addEventListener('load', function() {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render Country
    renderCountry(data);

    //Render Neighbours
    let neighbourCodes = '';
    data.borders.forEach(border => {
      neighbourCodes += `${border};`;
    });
    neighbourCodes = neighbourCodes.slice(0, -1);
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha?codes=${neighbourCodes}`);
    request2.send();

    request2.addEventListener('load', function() {
      const data2 = [...JSON.parse(this.responseText)];
      data2.forEach(country => {
        renderCountry(country, 'neighbour');
      });
    });
  })
};

// getCountryAndNeighboursData('india');


//////////////////////////////////////////////////////////////
// USING PROMISES
//////////////////////////////////////////////////////////////

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
}


const getCountryData = function(country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
    .then(response => {
      if (!response.ok){
        throw new Error(`Country not found (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      countriesContainer.innerHTML = '';

      // Render country
      renderCountry(data[0]);

      // Render neighbours
      let neighbourCodes = '';
      data[0].borders.forEach(border => {
        neighbourCodes += `${border};`;
      });
      neighbourCodes = neighbourCodes.slice(0, -1);

      return fetch(`https://restcountries.eu/rest/v2/alpha?codes=${neighbourCodes}`);
    })
    .then(response => {
      if (!response.ok){
        throw new Error(`Neighbours not found (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      data.forEach(country => {
        renderCountry(country, 'neighbour');
      });
    })
    .catch(err => renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

btn.addEventListener('click', () => {
  getCountryData('new zealand');
});
