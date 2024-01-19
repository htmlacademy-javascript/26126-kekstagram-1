import {createPhotoDescriptions} from './data.js';
import {createGallery} from './mini-pictures.js';
import {initSubmitUploadFormHandler} from './upload-photo-form.js';
import {initFullPhotoOpenHandler} from './full-picture.js';

const photoDescriptions = createPhotoDescriptions();

createGallery(photoDescriptions);
initFullPhotoOpenHandler(photoDescriptions);
initSubmitUploadFormHandler();
