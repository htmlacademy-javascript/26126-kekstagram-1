const pageBody = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const photoPreview = uploadForm.querySelector('.img-upload__preview');
const imgPreview = photoPreview.firstElementChild;
const effectsRadioBtnList = uploadForm.querySelector('.effects__list');
const controlInput = uploadForm.querySelector('.scale__control--value');

export {pageBody, uploadForm, imgPreview, effectsRadioBtnList, controlInput};
