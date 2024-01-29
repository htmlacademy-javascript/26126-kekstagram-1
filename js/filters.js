/* eslint-disable no-unused-vars */
import {createGallery} from './mini-pictures.js';
import {/*getRandomElement*/getRandomInt} from './util.js';
//import {MIN_INDEX, MAX_INDEX} from './const.js';

const filterSection = document.querySelector('.img-filters');
const defaultFilter = filterSection.querySelector('#filter-default');

const randomFilter = filterSection.querySelector('#filter-random');
const discussedFilter = filterSection.querySelector('#filter-discussed');


const initFilters = (photos) =>{
  filterSection.classList.remove('img-filters--inactive');
  createGallery(photos.slice());

  filterSection.addEventListener('click', (evt)=> {
    const currentFilter = evt.target.closest('.img-filters__button');
    if(currentFilter !== null) {
      const filtersBtns = filterSection.querySelectorAll('.img-filters__button');
      filtersBtns.forEach((item)=> {
        if(item.classList.contains('img-filters__button--active')){
          item.classList.remove('img-filters__button--active');
        }
      });
      currentFilter.classList.toggle('img-filters__button--active');
    }
  });
};

/*const getRandomPhotos = (array)=> {
  let randomIdexs = [];
  while(randomIdexs.length < 10){
    const randomIndex = getRandomInt(0, array.length - 1);
    randomIdexs.push(randomIndex);
    const set = new Set(randomIdexs);
    randomIdexs = Array.from(set);
  }
  const randomPhotos = [];
  randomIdexs.forEach((item)=> {
    randomPhotos.push(array[item]);
  });
  return randomPhotos;
};*/

/*const getRandomPhotos = (photos) => {
  const randomPhotos = [];
  for (let i = MIN_INDEX; i <= MAX_INDEX; i++) {
    const randomElement = getRandomElement(photos);
    randomPhotos.push(randomElement());
  }
  console.log(randomPhotos);
  return randomPhotos;
};*/

const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];

function getRandomPhotos (arrayNumbers) {
  let randomEl;
  const availableIndexes = [];
  for(let i = 0; i <= arrayNumbers.length - 1; i++) {
    availableIndexes.push(i);
  }
  //console.log(availableIndexes);
  function getRanEl() {
    const randomIndex = availableIndexes[getRandomInt(0, availableIndexes.length - 1)];
    availableIndexes.splice(randomIndex, 1);
    randomEl = arrayNumbers[randomIndex];
    return randomEl;
  }
  return getRanEl;
}

const randomElement = getRandomPhotos(numbers);

const getPhotos = () => Array.from({length:10}, randomElement);
const newNumbersArray = new Array(10).fill().map(()=>randomElement());
//console.log(randomElement());
//console.log(photos);

const sortByComments = (photos)=> {
  const sortedArray = photos.slice();
  sortedArray.sort((a, b)=> b.comments.length - a.comments.length);
  return sortedArray;
};

const setDefaulFilterClick = (cb) => {
  defaultFilter.addEventListener('click', cb);
};

const setRandomFilterClick = (cb) => {
  randomFilter.addEventListener('click', cb);
};

const setDiscussedFilterClick = (cb) => {
  discussedFilter.addEventListener('click', cb);
};

export {initFilters, setDefaulFilterClick, setRandomFilterClick, setDiscussedFilterClick, getRandomPhotos, sortByComments};
