const numCountries = document.querySelector('.numCountries');
numCountries.textContent = countries.length;

const startingWord = document.querySelector('#startingWord');
const anyWord = document.querySelector('#anyWord');
const alphabet = document.querySelector('#alphabet');
const input = document.querySelector('input')
const countriesWrapper = document.querySelector('.countries-wrapper');
const result = document.querySelector('.result');

// clear input text
input.addEventListener('focus', function () {
  input.value = "";
})

// Creating random color
// const randomHexaNumberGenerator = () => {
//   let letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color = color + letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

//or shorter way:
function randNumHexGenerator() {
  let randomColor = '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
  return randomColor;
}

//assign font-awesome html code.
alphabet.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';

//switch alphabet button to up or down
function alphaFunc() {
  if (alphabet.innerHTML.includes('down')) {
    alphabet.innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
    // UI
    alphabet.classList.add('active');
    showCountries();
  } else if (alphabet.innerHTML.includes('up')) {
    alphabet.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
    // UI
    alphabet.classList.remove('active');
    showCountries();
  }
}
alphabet.addEventListener('click', alphaFunc);

// add active class to desired button & remove the other button active class
startingWord.addEventListener('click', function () {
  anyWord.classList.remove('active');
  alphabet.classList.remove('active');
  startingWord.classList.add('active');
  showCountries();
});

anyWord.addEventListener('click', function () {
  startingWord.classList.remove('active');
  alphabet.classList.remove('active');
  anyWord.classList.add('active');
  showCountries();
});

//enter the search word, execute function & return the result.
input.addEventListener('keyup', showCountries);

// functions: 
function showCountries() {
  //condition for the the on-going button to perform which function.
  if (startingWord.classList.contains('active')) {
    startingWordSearch();
  } else if (anyWord.classList.contains('active')) {
    anyWordSearch();
  };

  //hide & show the countries && result according to input value 
  if (input.value === '') {
    // countriesWrapper.style.display = 'none';
    result.style.display = 'none';
  } else {
    // countriesWrapper.style.display = 'flex';
    result.style.display = 'block';
  }
};

function generateCountries(arr) {
  countriesWrapper.innerHTML = "";
  arr.forEach(element => {
    const country = document.createElement('div');
    country.classList.add('country');
    countriesWrapper.appendChild(country);
    const span = document.createElement('span');
    country.appendChild(span);
    const backgroundColor = randNumHexGenerator();
    country.style.background = `linear-gradient(to bottom, ${backgroundColor} 10%, transparent 100%)`;
    span.style.color = contrastTextBackground(backgroundColor);

    //extra: RegExp, change the search keyword to different color
    const key = new RegExp(input.value, "gi");
    span.innerHTML = element.replace(key, `<b class="keyword">${input.value.toLowerCase()}</b>`);
  });
}

// NOTE: 
// UPPERCASE every country in the array & check with the input value that is UPPERCASE also.

function startingWordSearch() {
  const inputCountries = countries.filter(country => {
    return country.toUpperCase().startsWith(input.value.toUpperCase(), 0);
  })
  sortCountries(inputCountries);
  generateCountries(inputCountries);

  result.innerHTML = `Countries starting with "<span class="words">${input.value}</span>" : <span class="nums">${inputCountries.length}</span>`;
}

function anyWordSearch() {
  const inputCountries = countries.filter(country => {
    return country.toUpperCase().includes(input.value.toUpperCase());
  })
  sortCountries(inputCountries);
  generateCountries(inputCountries);

  result.innerHTML = `Countries containing "<span class="words">${input.value}</span>" : <span class="nums">${inputCountries.length}</span>`;
}

function sortCountries(inputCountries) {
  //check if alphabet key is down, default, no change. 
  //if up, reverse it.
  if (alphabet.innerHTML.includes('up')) {
    inputCountries.reverse();
  }
}

// The code below is a simpler way to choose a contrasting text color. You can delete seven functions from above (hexToRgb(), formatRgb(), rgbToHsl(), formatHsl(), pickContrastingFont(), and generateDivs()), and simply use the function below:
//pick a font color that has enough contrast with the background

function contrastTextBackground(randNumHexGenerator) {
  // 2 digits for each (r,g,b)
  let rawR = randNumHexGenerator.slice(1, 3);
  let rawG = randNumHexGenerator.slice(3, 5);
  let rawB = randNumHexGenerator.slice(5, 7);
  // convert to Integer (0 - 255)
  let R = parseInt(rawR, 16);
  let G = parseInt(rawG, 16);
  let B = parseInt(rawB, 16);
  // if the values of R,G,B are high, the background color is light => pick dark/black text
  // if the values of R,G,B are low, the background color is dark => pick white text
  if (R + G + B > 400) {
    return 'black';
  } else {
    return 'white';
  }
}