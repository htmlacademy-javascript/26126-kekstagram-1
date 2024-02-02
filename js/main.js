import {showAlert, debounce} from './util.js';
import {TIMEOUT_DELAY} from './const.js';
import {getData} from './fetch.js';
import {createGallery} from './mini-pictures.js';
import {initSubmitUploadFormHandler, closePhotoEditor} from './upload-photo-form.js';
import {initFullPhotoOpenHandler} from './full-picture.js';
import {initFilters, setDefaultFilterClick, setRandomFilterClick, setDiscussedFilterClick, getArrayFromRandomPhoto,sortByComments} from './filters.js';

getData()
  .then((photos) => {
    initFilters(photos);
    setDefaultFilterClick(debounce(()=>createGallery(photos.slice()), TIMEOUT_DELAY));
    setRandomFilterClick(debounce(()=> createGallery(getArrayFromRandomPhoto(photos)),TIMEOUT_DELAY));
    setDiscussedFilterClick(debounce(()=>createGallery(sortByComments(photos)), TIMEOUT_DELAY));
    initFullPhotoOpenHandler(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
initSubmitUploadFormHandler(closePhotoEditor);
