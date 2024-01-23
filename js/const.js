import {getChromeStyleFilter, getSepiaStyleFilter, getMarvinStyleFilter, getPhobosStyleFilter,getHeatStyleFilter} from './util.js';
const PHOTOS_MAX_COUNT = 25;
const LIKES_MAX_COUNT = 20;
const LIKES_MIN_COUNT = 15;
const COMMENT_MAX_COUNT = 20;
const COMMENT_MIN_COUNT = 0;
const AVATAR_MIN_NUMBER = 1;
const AVATAR_MAX_NUMBER = 6;
const COMMENT_STEP = 5;
const COMMENTS_PLURAL = ['комментарий', 'комментария', 'комментариев'];
const HASHTAG_MAX_COUNT = 5;
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const EFFECT_LEVEL_MAX = 100;

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

const DESCRIPTIONS = ['котик', 'закат', 'рассвет'];
const NAMES = ['Артем','Владислав', 'Светлана', 'Георгий', 'Анжелика'];
const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const styleFilterByEffects = {
  chrome: getChromeStyleFilter,
  sepia: getSepiaStyleFilter,
  marvin: getMarvinStyleFilter,
  phobos: getPhobosStyleFilter,
  heat: getHeatStyleFilter,
};

export {PHOTOS_MAX_COUNT, LIKES_MAX_COUNT, LIKES_MIN_COUNT, AVATAR_MIN_NUMBER,DESCRIPTIONS,COMMENT_MAX_COUNT,COMMENT_MIN_COUNT, AVATAR_MAX_NUMBER, NAMES, MESSAGES, COMMENT_STEP, COMMENTS_PLURAL, HASHTAG_MAX_COUNT, SCALE_STEP, SCALE_MAX, SCALE_MIN, Effects, EFFECT_LEVEL_MAX, styleFilterByEffects};
