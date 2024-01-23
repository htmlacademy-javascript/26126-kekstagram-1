import {showAlert} from './util.js';
import {getData} from './fetch.js';
import {createGallery} from './mini-pictures.js';
import {initSubmitUploadFormHandler, closePhotoEditor} from './upload-photo-form.js';
import {initFullPhotoOpenHandler} from './full-picture.js';

getData()
  .then((photos) => {
    createGallery(photos);
    initFullPhotoOpenHandler(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
initSubmitUploadFormHandler(closePhotoEditor);
