import {showAlert, debounce} from './util.js';
import {getData} from './fetch.js';
import {createGallery} from './mini-pictures.js';
import {initSubmitUploadFormHandler, closePhotoEditor} from './upload-photo-form.js';
import {initFullPhotoOpenHandler} from './full-picture.js';
import {initFilters, onDefaulFilterClick, onRandomFilterClick, onDiscussedFilterClick, getRandomPhotos,sortByComments} from './filters.js';

getData()
  .then((photos) => {
    initFilters(photos);
    onDefaulFilterClick(debounce(()=>createGallery(photos.slice())));
    onRandomFilterClick(debounce(()=>createGallery(getRandomPhotos(photos))));
    onDiscussedFilterClick(debounce(()=>createGallery(sortByComments(photos))));
    initFullPhotoOpenHandler(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
initSubmitUploadFormHandler(closePhotoEditor);
