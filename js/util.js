import {ALERT_SHOW_TIME, SubmitButtonText} from './const.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

const pluralize = (num, titles) => {
  if(num % 10 === 1 && num % 100 !== 11){
    return `${num}  ${titles[0]}`;
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)){
    return `${num}  ${titles[1]}`;
  } else {
    return `${num}  ${titles[2]}`;
  }
};

const getRandomInt = (min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const arrayWithoutEmptyElements = (array) => array.filter(Boolean);

const getEffectSelector = (currentInputId) => {
  const selectors = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat',

  };
  return selectors[currentInputId];
};

const alertTemplate = document.querySelector('#alert')
  .content
  .querySelector('.alert__block');

const showAlert = (message) => {
  alertTemplate.textContent = message;
  document.body.append(alertTemplate);

  setTimeout(() => {
    alertTemplate.remove();
  }, ALERT_SHOW_TIME);
};

const blockSubmitButton = (button) => {
  button.disabled = true;
  button.textContent = SubmitButtonText.SENDING;
};

const unBlockSubmitButton = (button) => {
  button.disabled = false;
  button.textContent = SubmitButtonText.IDLE;
};

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showSuccessMessage = (container) => {
  const success = successTemplate.cloneNode(true);
  container.appendChild(success);
};

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showErrorMessage = (container) => {
  const error = errorTemplate.cloneNode(true);
  container.appendChild(error);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
function getRandomElement (elements) {
  let randomElement;
  const availableIndexes = [];
  for(let i = 0; i <= elements.length - 1; i++) {
    availableIndexes.push(i);
  }
  function getElement() {
    const randomIndex = getRandomInt(0, availableIndexes.length - 1);
    const elementFromAvailableIndexes = availableIndexes[randomIndex];
    availableIndexes.splice(randomIndex, 1);
    randomElement = elements[elementFromAvailableIndexes];
    return randomElement;
  }
  return getElement;
}


export {isEscapeKey, pluralize, arrayWithoutEmptyElements, getEffectSelector, showAlert, blockSubmitButton, unBlockSubmitButton,showSuccessMessage, showErrorMessage, debounce, getRandomElement};
