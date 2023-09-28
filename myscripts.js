const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const fetchApi = async () => {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    cities.push(...data);
    // console.log(...data);
  } catch (err) {
    console.log(err);
  }
};

fetchApi();

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// SEARCH FUNCTION
function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArr = findMatches(this.value, cities);

  // HIGHLIGHT SEARCH TERM
  const regex = new RegExp(this.value, 'gi');
  const html = matchArr
    .map((place) => {
      const cityName = place.city.replace(
        regex,
        `<span class="highlight">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="highlight">${this.value}</span>`
      );
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>`;
    })
    .join('');
  suggestionsInput.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestionsInput = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
