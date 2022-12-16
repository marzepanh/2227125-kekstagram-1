import {isEscapeKey, arrayEnded} from './util.js';

const classBigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const classSocialComment = document.querySelector('.social__comment');
const classCommentsLoader = document.querySelector('.comments-loader');
const classSocialCommentCount = document.querySelector('.social__comment-count');
const bigImg = document.querySelector('.big-picture__img').querySelector('img');
const likes = document.querySelector('.likes-count');
const description = document.querySelector('.social__caption');
const cancel = document.querySelector('.big-picture__cancel');
let loadedCommentsCounter, numOfComments = 0;
let commentsClone, clone;

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
}

function addEventListeners() {
  cancel.addEventListener('click', closeFullSizePhoto);
  document.addEventListener('keydown', onPopupEscKeydown);
  classCommentsLoader.addEventListener('click', creatingComments);
}

function removeEventListeners() {
  document.removeEventListener('keydown', onPopupEscKeydown);
  cancel.removeEventListener('click', closeFullSizePhoto);
  classCommentsLoader.removeEventListener('click', creatingComments);
}

export function viewPhotoInFullSize (photo) {
  bigImg.src = photo.url;
  likes.textContent = photo.likes;
  description.textContent = photo.description;
  body.classList.add('modal-open');
  classBigPicture.classList.remove('hidden');
  addEventListeners();
  classCommentsLoader.classList.remove('hidden');
  createComments(photo.comments);
}

function closeFullSizePhoto() {
  classBigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  removeEventListeners();
}

function creatingComments() {
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
  clone = classSocialComment.cloneNode(true);
  deleteComments();
  creatingComments();
}

function deleteComments () {
  const arrOfCom = document.querySelectorAll('.social__comment');
  Array.from({length:  arrOfCom.length}, () => document.querySelector('.social__comment').remove());
}
