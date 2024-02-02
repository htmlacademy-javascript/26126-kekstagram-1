import {pageBody, uploadForm, effectsRadioBtnList} from './element.js';
import {isEscapeKey, getArrayWithoutEmptyElements, showSuccessMessage,showErrorMessage, blockSubmitButton, unBlockSubmitButton} from './util.js';
import {HASHTAG_MAX_COUNT, FILE_TYPES} from './const.js';
import {removeSizeBtnLicteners, addSizeBtnListeners, resetPhotoSize} from './resize-photo.js';
import {onEffectRadioBtnClick, resetFilter} from './slider-editor.js';
import {sendData} from './fetch.js';

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const preview = document.querySelector('.img-upload__preview');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');

const submitBtn = uploadForm.querySelector('#upload-submit');
let successModal = null;
let successBtn;
let errorModal = null;
let errorBtn;

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

const onSuccessBtnClick = () => {
  closeSuccessModal();
};

const onErrorBtnClick = () => {
  closeErrorModal();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const currentFocusedElement = document.activeElement;
    if(currentFocusedElement === hashtagInput || currentFocusedElement === commentInput){
      evt.stopPropagation();
    } else if(successModal !== null || errorModal !== null){
      closeSuccessModal();
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

function closeSuccessModal() {
  if(successModal !== null){
    successModal.remove();
    successModal = null;
    document.removeEventListener('keydown', onDocumentKeydown);
    successBtn.removeEventListener('click', onSuccessBtnClick);
    pageBody.removeEventListener('click', onSuccessBtnClick);
  }
}

function closeErrorModal() {
  if(errorModal !== null){
    errorModal.remove();
    errorModal = null;
    document.removeEventListener('keydown', onDocumentKeydown);
    errorBtn.removeEventListener('click', onErrorBtnClick);
    pageBody.removeEventListener('click', onErrorBtnClick);
  }
}

const isHashtagRegValid = (value) => {
  const hashtags = value.split(' ');
  const validHashtagReg = /^$|^#[a-z-а-яё0-9]{1,19}$/i;
  return hashtags.every((item)=> validHashtagReg.test(item));
};

const isHashtagCountValid = (value) => {
  const hashtags = value.split(' ');
  return getArrayWithoutEmptyElements(hashtags).length <= HASHTAG_MAX_COUNT;
};
let duplicates = [];

const isDuplicateHashtags = (value) => {
  const hashtagsArray = value.toLowerCase().split(' ');
  duplicates = getArrayWithoutEmptyElements(hashtagsArray).filter((hashtag, index, array) => array.indexOf(hashtag) !== index);
  return duplicates.length <= 0;
};

const getDuplicateString = () => {
  const duplicatesString = duplicates.join(', ');
  return `дубликаты: ${ duplicatesString}`;
};

const initSubmitUploadFormHandler = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton(submitBtn);
      sendData(new FormData(evt.target))
        .then((data)=> {
          onSuccess(data);
          showSuccessMessage(pageBody);
          successModal = document.querySelector('.success');
          successBtn = successModal.querySelector('.success__button');
          pageBody.addEventListener('click', onSuccessBtnClick);
          successBtn.addEventListener('click', onSuccessBtnClick);
          document.addEventListener('keydown', onDocumentKeydown);
        })
        .catch(() => {
          showErrorMessage(pageBody);
          errorModal = document.querySelector('.error');
          errorBtn = errorModal.querySelector('.error__button');
          pageBody.addEventListener('click', onErrorBtnClick);
          errorBtn.addEventListener('click', onErrorBtnClick);
          document.addEventListener('keydown', onDocumentKeydown);
        })
        .finally(() => unBlockSubmitButton(submitBtn));
    }
  });
};

uploadFileControl.addEventListener('change', () => {
  if(uploadFileControl.value !== null) {
    const file = uploadFileControl.files[0];
    const fileName = file.name.toLowerCase();
    const isMatches = FILE_TYPES.some((it) => fileName.endsWith(it));
    const userFileUrl = URL.createObjectURL(file);
    if (isMatches) {
      preview.firstElementChild.src = userFileUrl;
      effectsPreviews.forEach((item)=> {
        item.style.backgroundImage = `url(${userFileUrl})`;
      });
    }
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    addSizeBtnListeners();
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    effectsRadioBtnList.addEventListener('click', onEffectRadioBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }
});

pristine.addValidator(hashtagInput, isHashtagRegValid, 'поле Хештег заполняется в формате: #example123 или #пример123, не более 20ти символов');
pristine.addValidator(hashtagInput, isHashtagCountValid, 'более 5ти хештегов');
pristine.addValidator(hashtagInput, isDuplicateHashtags, getDuplicateString);

export {initSubmitUploadFormHandler, closePhotoEditor};
