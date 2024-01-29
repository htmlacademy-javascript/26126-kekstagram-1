import {showAlert, debounce} from './util.js';
import {getData} from './fetch.js';
import {createGallery} from './mini-pictures.js';
import {initSubmitUploadFormHandler, closePhotoEditor} from './upload-photo-form.js';
import {initFullPhotoOpenHandler} from './full-picture.js';
import {initFilters, setDefaulFilterClick, setRandomFilterClick, setDiscussedFilterClick, getRandomPhotos,sortByComments} from './filters.js';

getData()
  .then((photos) => {
    initFilters(photos);
    setDefaulFilterClick(debounce(()=>createGallery(photos.slice())));
    setRandomFilterClick(debounce(()=>createGallery(getRandomPhotos(photos))));
    setDiscussedFilterClick(debounce(()=>createGallery(sortByComments(photos))));
    initFullPhotoOpenHandler(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
initSubmitUploadFormHandler(closePhotoEditor);
