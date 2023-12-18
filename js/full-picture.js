import {picturesContainer} from './mini-pictures.js';
import {isEscapeKey} from './util.js';

const pageBody = document.querySelector('body');
const bigPictureModal = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const commentsFragment = document.createDocumentFragment();
const commentsContainer = bigPictureModal.querySelector('.social__comments');

const visibleCommentsCount = bigPictureModal.querySelector('.social__comment-count');
const totalCommentsCount = bigPictureModal.querySelector('.comments-count');

const exitBtn = bigPictureModal.querySelector('#picture-cancel');

const fillBigPhoto = (emptyBigPhoto, currentObject) => {
  emptyBigPhoto.querySelector('.likes-count').textContent = currentObject.likes;
  emptyBigPhoto.querySelector('.comments-count').textContent = currentObject.comments.length;
  emptyBigPhoto.querySelector('.social__caption').textContent = currentObject.description;
  emptyBigPhoto.querySelector('.big-picture__img')
    .querySelector('img').src = currentObject.url;
};

const createCommentsList = (currentObject) => {
  currentObject.comments.slice().forEach(({avatar, message, name}) => {
    commentTemplate.querySelector('.social__picture').src = avatar;
    commentTemplate.querySelector('.social__picture').alt = name;
    commentTemplate.querySelector('.social__text').textContent = message;

    const comment = commentTemplate.cloneNode(true);
    commentsFragment.appendChild(comment);
  });

  commentsContainer.appendChild(commentsFragment);
};

const clearCommentsList = () => {
  commentsContainer.innerHTML = '';
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

const onExitBtnClick = () => {
  closeFullPhoto();
};

function closeFullPhoto () {
  bigPictureModal.classList.add('hidden');
  clearCommentsList();
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  exitBtn.removeEventListener('click', onExitBtnClick);
}

const openFullPhoto = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {
    if(evt.target.closest('.picture')) {
      const pictureId = Number(evt.target.closest('.picture').dataset.id);
      const currentPhoto = photos.find((item) => item.id === pictureId);

      bigPictureModal.classList.remove('hidden');
      pageBody.classList.add('modal-open');

      visibleCommentsCount.classList.add('hidden');
      totalCommentsCount.classList.add('hidden');

      document.addEventListener('keydown', onDocumentKeydown);
      exitBtn.addEventListener('click', onExitBtnClick);

      fillBigPhoto(bigPictureModal, currentPhoto);
      createCommentsList(currentPhoto);
    }
  });
};


export {openFullPhoto};
