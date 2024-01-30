import {createGallery} from './mini-pictures.js';
import {getRandomElement} from './util.js';
import {RANDOM_PHOTOS_COUNT} from './const.js';

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

const getArrayFromRandomPhoto = (photos) => {
  const randomPhoto = getRandomElement(photos);
  const randomPhotos = new Array(RANDOM_PHOTOS_COUNT).fill().map(()=>randomPhoto());
  return randomPhotos;
};

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

export {initFilters, setDefaulFilterClick, setRandomFilterClick, setDiscussedFilterClick, getArrayFromRandomPhoto, sortByComments};
