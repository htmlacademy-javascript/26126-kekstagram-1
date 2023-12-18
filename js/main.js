import {createPhotoDescriptions} from './data.js';
import {createGallery} from './mini-pictures.js';

import {openFullPhoto} from './full-picture.js';

const photoDescriptions = createPhotoDescriptions();

createGallery(photoDescriptions);
openFullPhoto(photoDescriptions);

