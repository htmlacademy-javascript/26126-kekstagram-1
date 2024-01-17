const idGenerator = function*(maxCount) {
  let currentId = 1;
  while (currentId <= maxCount) {
    yield currentId++;
  }
};

const getRandomInt = (min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElementFromArray = (elementsArray) => {
  const randomElement = elementsArray[getRandomInt(0, elementsArray.length - 1)];
  return randomElement;
};

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

export {idGenerator, getRandomInt, getRandomElementFromArray,isEscapeKey, pluralize, arrayWithoutEmptyElements};
