const COMMENT_STEP = 5;
const COMMENTS_PLURAL = ['комментарий', 'комментария', 'комментариев'];
const HASHTAG_MAX_COUNT = 5;
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const EFFECT_LEVEL_MAX = 100;
const ALERT_SHOW_TIME = 5000;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const sliderOptionsObjectChromeSepia = {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
};


const sliderOptionsObjectMarvinDefault = {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
};

const sliderOptionsObjectPhobos = {
  range: {
    min: 0,
    max: 3
  },
  start: 3,
  step: 0.1,
};

const sliderOptionsObjectHeat = {
  range: {
    min: 1,
    max: 3
  },
  start: 3,
  step: 0.1,
};

const Effects = {
  none: sliderOptionsObjectMarvinDefault,
  chrome: sliderOptionsObjectChromeSepia,
  sepia: sliderOptionsObjectChromeSepia,
  marvin: sliderOptionsObjectMarvinDefault,
  phobos: sliderOptionsObjectPhobos,
  heat: sliderOptionsObjectHeat,
};


const getChromeStyleFilter = (value)=> `grayscale(${value})`;
const getSepiaStyleFilter = (value)=> `sepia(${value})`;
const getMarvinStyleFilter = (value)=> `invert(${value}%)`;
const getPhobosStyleFilter = (value)=> `blur(${value}px)`;
const getHeatStyleFilter = (value)=> `brightness(${value})`;

const styleFilterByEffects = {
  chrome: getChromeStyleFilter,
  sepia: getSepiaStyleFilter,
  marvin: getMarvinStyleFilter,
  phobos: getPhobosStyleFilter,
  heat: getHeatStyleFilter,
};

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

export {COMMENT_STEP, COMMENTS_PLURAL, HASHTAG_MAX_COUNT, SCALE_STEP, SCALE_MAX, SCALE_MIN, Effects, EFFECT_LEVEL_MAX, styleFilterByEffects,ALERT_SHOW_TIME, SubmitButtonText, BASE_URL, Route, Method, ErrorText};
