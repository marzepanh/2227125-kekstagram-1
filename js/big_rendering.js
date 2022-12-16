import {isEscapeKey, arrayEnded} from './util.js';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
};

const classBigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const classSocialComment = document.querySelector('.social__comment');
const classCommentsLoader = document.querySelector('.comments-loader');
const classSocialCommentCount = document.querySelector('.social__comment-count');
let loadedCommentsCounter = 0;
let numOfComments = 0;
let commentsClone;

export function viewPhotoInFullSize (photo) {
  document.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.social__caption').textContent = photo.description;
  body.classList.add('modal-open');
  classBigPicture.classList.remove('hidden');
  document.querySelector('.big-picture__cancel').addEventListener('click', closeFullSizePhoto);
  document.addEventListener('keydown', onPopupEscKeydown);
  classCommentsLoader.classList.remove('hidden');
  createComments(photo.comments);
}

function closeFullSizePhoto() {
  classBigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function creatingComments(clone) {
  let counter = 0;
  while (counter !== 5) {
    if (arrayEnded(commentsClone)) {break;}
    const img = clone.querySelector('img');
    img.src = commentsClone[0].avatar;
    img.alt = commentsClone[0].name;
    clone.querySelector('.social__text').textContent = commentsClone[0].message;
    document.querySelector('.social__comments').appendChild(clone);
    clone = classSocialComment.cloneNode(true);
    commentsClone.splice(0, 1);
    counter++;
  }
  loadedCommentsCounter += counter;
  classSocialCommentCount.textContent = `${loadedCommentsCounter} из ${numOfComments} комментариев`;
  if (arrayEnded(commentsClone)) {classCommentsLoader.classList.add('hidden');}
}

function createComments (comments) {
  numOfComments = comments.length;
  loadedCommentsCounter = 0;
  commentsClone = comments.slice(0);
  const clone = classSocialComment.cloneNode(true);
  deleteComments();
  creatingComments(clone);
  classCommentsLoader.addEventListener('click', () => {
    creatingComments(clone);
  });
}

function deleteComments () {
  const arrOfCom = document.querySelectorAll('.social__comment');
  Array.from({length:  arrOfCom.length}, () => document.querySelector('.social__comment').remove());
}
