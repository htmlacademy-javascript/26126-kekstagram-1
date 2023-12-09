const PHOTOS_MAX_COUNT = 25;
const DESCRIPTIONS = ['котик', 'закат', 'рассвет'];
const NAMES = ['Артем','Владислав', 'Светлана', 'Георгий', 'Анжелика'];
const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

/*//сетчик, работа с замыканием
const createCounter = function(init) {
  let currentValue = init;
  return {
    increment: function(){
      currentValue += 1;
      return currentValue;
    },
    decrement: function(){
      currentValue -= 1;
      return currentValue;
    },
    reset: function(){
      currentValue = init;
      return currentValue;
    }
  };
};
const counter = createCounter(5);*/
// counter.increment(); // 6
//counter.reset(); // 5
//counter.decrement(); // 4
/*
//последовательность фибоначчи
const fibGenerator = function*() {
  let preLastValue = 0;
  let lastValue = 1;
  yield preLastValue;
  yield lastValue;
  while (true) {
    const newValue = lastValue + preLastValue;
    yield newValue;
    preLastValue = lastValue;
    lastValue = newValue;
  }
};
const gen = fibGenerator();*/

const idGenerator = function*(maxCount) {
  let currentId = 1;
  while (currentId <= maxCount) {
    yield currentId++;
  }
};

const generatePhotoId = idGenerator(PHOTOS_MAX_COUNT);
const generateUrlId = idGenerator(PHOTOS_MAX_COUNT);
const generateCommentId = idGenerator(Infinity);

const getRandomInt = (min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElementFromArray = (elementsArray) => {
  const randomElement = elementsArray[getRandomInt(0, elementsArray.length - 1)];
  return randomElement;
};

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

