import {PHOTOS_MAX_COUNT, DESCRIPTIONS, NAMES, MESSAGES} from './const.js';
import {idGenerator, getRandomInt, getRandomElementFromArray} from './util.js';

const generatePhotoId = idGenerator(PHOTOS_MAX_COUNT);
const generateUrlId = idGenerator(PHOTOS_MAX_COUNT);
const generateCommentId = idGenerator(Infinity);

const createComment = () => ({
  id: generateCommentId.next().value,
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomElementFromArray(MESSAGES),
  name: getRandomElementFromArray(NAMES),
});

const createPhotoDescription = () => ({
  id:  generatePhotoId.next().value,
  url: `photos/${generateUrlId.next().value}.jpg`,
  description: getRandomElementFromArray(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: Array.from({length:getRandomInt(1,15)}, createComment)
});

// eslint-disable-next-line no-unused-vars
const photoDescriptions = Array.from({length:25}, createPhotoDescription);

