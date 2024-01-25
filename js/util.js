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

export {isEscapeKey, pluralize, arrayWithoutEmptyElements, getEffectSelector, showAlert, blockSubmitButton, unBlockSubmitButton,showSuccessMessage, showErrorMessage};
