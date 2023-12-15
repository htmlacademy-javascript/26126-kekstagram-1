import './util.js';
import {createPhotoDescriptions} from './data.js';
import {createGallery} from './mini-pictures.js';
import './const.js';
import './mini-pictures.js';

const photoDescriptions = createPhotoDescriptions();

createGallery(photoDescriptions);
