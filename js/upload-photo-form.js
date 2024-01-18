import {pageBody, uploadForm, effectsRadioBtnList} from './element.js';
import {isEscapeKey, arrayWithoutEmptyElements} from './util.js';
import {HASHTAG_MAX_COUNT} from './const.js';
import {removeSizeBtnLicteners, addSizeBtnLicteners, resetPhotoSize} from './resize-photo.js';
import {onEffectRadioBtnClick, resetFilter} from './slider-editor.js';

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'text__hashtags-label',
  errorTextParent: 'text__hashtags-label',
  errorTextClass: 'text__error'
});

const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(document.activeElement === hashtagInput || document.activeElement === commentInput){
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor () {
  uploadForm.reset();
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
  pristine.reset();
  removeSizeBtnLicteners();
  resetFilter();
  resetPhotoSize();
  effectsRadioBtnList.removeEventListener('click', onEffectRadioBtnClick);
}

uploadFileControl.addEventListener('change', () => {
  if(uploadFileControl.value) {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    addSizeBtnLicteners();
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    effectsRadioBtnList.addEventListener('click', onEffectRadioBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }
});

const isHashtagRegValid = (value) => {
  const hashtags = value.split(' ');
  const validHashtagReg = /^$|^#[a-z-а-яё0-9]{1,19}$/i;
  return hashtags.every((item)=> validHashtagReg.test(item));
};

const isHashtagCountValid = (value) => {
  const hashtags = value.split(' ');
  return arrayWithoutEmptyElements(hashtags).length <= HASHTAG_MAX_COUNT;
};
let duplicates = [];

const isDuplicateHashtags = (value) => {
  const hashtagsArray = value.toLowerCase().split(' ');
  duplicates = arrayWithoutEmptyElements(hashtagsArray).filter((hashtag, index, array) => array.indexOf(hashtag) !== index);
  return duplicates.length <= 0;
};

const getDuplicateString = () => {
  const duplicatesString = duplicates.join(', ');
  return` ${`дубликаты: ${ duplicatesString}`}`;
};

pristine.addValidator(hashtagInput, isHashtagRegValid, 'поле Хештег заполняется в формате: #example123 или #пример123, не более 20ти символов');
pristine.addValidator(hashtagInput, isHashtagCountValid, 'более 5ти хештегов');
pristine.addValidator(hashtagInput, isDuplicateHashtags, getDuplicateString);

const initSubmitUploadFormHandler = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {initSubmitUploadFormHandler};
