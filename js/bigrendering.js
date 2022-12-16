import {isEscapeKey} from './util.js';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
};

const classBigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');

export function viewPhotoInFullSize (photo) {
  document.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.comments-count').textContent = photo.comments.length;
  document.querySelector('.social__caption').textContent = photo.description;
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  body.classList.add('modal-open');
  classBigPicture.classList.remove('hidden');
  document.querySelector('.big-picture__cancel').addEventListener('click', closeFullSizePhoto);
  document.addEventListener('keydown', onPopupEscKeydown);
  createComments(photo.comments);
}

function closeFullSizePhoto() {
  classBigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function createComments (comments) {
  const classSocialComment = document.querySelector('.social__comment');
  let clone = classSocialComment.cloneNode(true);
  deleteComments();
  for (const comment of comments) {
    const img = clone.querySelector('img');
    img.src = comment.avatar;
    img.alt = comment.name;
    clone.querySelector('.social__text').textContent = comment.message;
    document.querySelector('.social__comments').appendChild(clone);
    clone = classSocialComment.cloneNode(true);
  }
}

function deleteComments () {
  const arrOfCom = document.querySelectorAll('.social__comment');
  Array.from({length:  arrOfCom.length}, () => document.querySelector('.social__comment').remove());
}
