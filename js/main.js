import {createPhotoDescriptions} from './data.js';
import {createGallery} from './mini-pictures.js';

const photoDescriptions = createPhotoDescriptions();

createGallery(photoDescriptions);
