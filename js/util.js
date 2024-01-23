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


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const disableSubmitButton = (button) => {
  button.disabled = true;
  button.textContent = SubmitButtonText.SENDING;
};

const unDisableSubmitButton = (button) => {
  button.disabled = false;
  button.textContent = SubmitButtonText.IDLE;
};

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showAlertSuccess = (container) => {
  const success = successTemplate.cloneNode(true);
  container.appendChild(success);
};

export {isEscapeKey, pluralize, arrayWithoutEmptyElements, getEffectSelector, showAlert, disableSubmitButton, unDisableSubmitButton,showAlertSuccess};
