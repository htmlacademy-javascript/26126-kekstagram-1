import {createGallery} from './mini-pictures.js';
import {getRandomInt} from './util.js';

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


const getRandomPhotos = (photos)=> {
  let randomIdexs = [];
  while(randomIdexs.length < 10){
    const randomIndex = getRandomInt(0, photos.length - 1);
    randomIdexs.push(randomIndex);
    const set = new Set(randomIdexs);
    randomIdexs = Array.from(set);
  }
  const randomPhotos = [];
  randomIdexs.forEach((item)=> {
    randomPhotos.push(photos[item]);
  });
  return randomPhotos;
};

const sortByComments = (photos)=> {
  const sortedArray = photos.slice();
  sortedArray.sort((a, b)=> b.comments.length - a.comments.length);
  return sortedArray;
};

const onDefaulFilterClick = (cb) => {
  defaultFilter.addEventListener('click', ()=> {
    cb();
  });
};

const onRandomFilterClick = (cb) => {
  randomFilter.addEventListener('click', ()=> {
    cb();
  });
};

const onDiscussedFilterClick = (cb) => {
  discussedFilter.addEventListener('click', ()=> {
    cb();
  });
};

export {initFilters, onDefaulFilterClick, onRandomFilterClick, onDiscussedFilterClick, getRandomPhotos, sortByComments};
