import {createArrOfPhoto } from './data.js';
const photoListElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photo = createArrOfPhoto ();
const photoListFragment = document.createDocumentFragment();

photo.forEach(({url, likes, comments}) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoListFragment.appendChild(photoElement);
});

photoListElement.appendChild(photoListFragment);
