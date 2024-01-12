import {createPhotoDescriptions} from './data.js';
import {createGallery} from './mini-pictures.js';
import {initSubmitUploadformHandler} from './upload-photo-form.js';
import {initFullPhotoOpenHandler} from './full-picture.js';

const photoDescriptions = createPhotoDescriptions();

createGallery(photoDescriptions);
initFullPhotoOpenHandler(photoDescriptions);
initSubmitUploadformHandler();
